import {Info, Save, Tag, X} from 'lucide-react';
import React, {useEffect, useRef, useState} from 'react';
import toast from 'react-hot-toast';
import QuillEditor from '../Components/QuillEditor';
import { useAuth } from '../context/AuthContext'
import { useNavigate, useParams } from 'react-router';
import { uploadImage } from '../lib/storage';
import { createArticle, getArticleById, updateArticle } from '../lib/article';

const AVAILABLE_TAGS = [
    'React','JavaScript','Css','Tailwind','Web Development','Backend','Frontend','UI Design','Performance','Supabase','Real-time','API','Testing','TypeScript','Future Tech'
]

export const ArticleEditor = () => {

    // state for article data

    const [ title,setTitle ] = useState('')
    const [ content,setContent ] = useState('')
    const [ selectedTags,setSelectedTags ] = useState([])
    const [ isSaving,setIsSaving ] = useState(false)
    const [ isTagMenuOpen,setIsTagMenuOpen ] = useState(false)
    const [ isPublished,setIsPublished ] = useState(false)
    const [ error,setError ] = useState(null)

    // state for image upload

    const [ selectedImage,setSelectedImage ] = useState(null)
    const [ isUploading,setIsUploading ] = useState(false)
    const [ imagePath,setImagePath ] = useState('')
    const [ featuredImageUrl,setFeaturedImageUrl ] = useState('')

    const { user } = useAuth()
    const navigate = useNavigate()

    const { id } = useParams()  
    const isEditMode  = Boolean(id)

    const fileInputRef = useRef(null)
    const editorRef = useRef(null)

    useEffect(()=>{
        if(isEditMode) {
            const fetchArticle = async () => {

                try {
                    const article = await getArticleById(id)
                    console.log('Article info: ',article)

                    if(!article) {
                        setError('Article not found!')
                        return
                    }

                    // check if the user is the author means creator

                    if(article.author_id !== user?.id) {
                        setError('You do not have permission to edit the article.')
                        return
                    }

                    setTitle(article.title)
                    setContent(article.content)
                    setSelectedTags(article.tags)

                    // Handle featured image lpading explicit error handling

                    if(article.featured_image) {
                        console.log('Loading existing featured image:,',article.featured_image)

                        // simplify => set the url directly without the fetch check

                        setFeaturedImageUrl(article.featured_image)
                    }else{
                        setFeaturedImageUrl('')
                    }

                    // set imagePath(ar)

                    setIsPublished(article.published || false)
                } catch (error) {
                    console.error('Error fetching article:',error)
                    setError('Failed to load article')
                }




            } 

            fetchArticle()
        }
    },[id,isEditMode,user?.id])

    

    const toggleTag = (tag) => {
        setSelectedTags((prevTags)=>prevTags.includes(tag) ? prevTags.filter(t=> t !== tag) : [...prevTags,tag] )
    }


    const handleContentChange = (value) => {
        setContent(value)
    }

    const handleImageSelect = (e) => {
        const file = e.target.files[0]

        if(file) {
            // check the file tag

            if(!file.type.startsWith('image/')) {
                toast.error('Please select an image file')

                e.target.value = ''
                setSelectedImage(null)

                return
            }

            // check the file size limit 2MB

            const maxSize = 2 * 1024 * 10234

            if(file.size > maxSize ) {
                toast.error(`Image size ( ${(file.size / 1024 /1024).toFixed(2)}MB) exceeds the 2MB limit `)

                e.target.value = ''
                setSelectedImage(null)

                return
            }
        }

        setSelectedImage(file)

        toast.success( `Select file: ${file.name} `)
    }

    const handleUploadImage = async () => {
        if(!selectedImage) {
            toast.error('Please select an image.')
            return
        }
        
        // check if the user is signed in

        if(!user) {
            toast.error('You must be signed in to upload images')
            navigate('/signin')
        }

        // starting the upload

        setIsUploading(true)

        console.log('Starting the upload...',selectedImage)

        try {
            // upload image to supabase
            const { path, url } = await uploadImage(user.id,selectedImage)
            console.log('Image uploaded successfully:',{path, url})

            setFeaturedImageUrl(url)
            setImagePath(path)

            // clear the selected image and file input 
            setSelectedImage(null)
            if(fileInputRef.current) {
                fileInputRef.current.value = ''
            }

            toast.success('Image uploaded successfully.')
            console.log('Image uploaded successfully:',{
                featuredImageUrl:url,
                imagePath:path
            })

            // return the upload image data

            return { path, url }

        } catch (error) {
            console.log('Error uploading image:',error)
            toast.error(`Error uploading image: ${error.message || 'unkown error'} `)
        }
        finally {
            setIsUploading(false)
        }

    }

    const handleSave = async ( publishedStatus = null ) => {
        // Validate the title input
        if(!title.trim()) {
            toast.error('Please add a title to your article.')
            return
        }

        // check the content
        if(!content || content === '<p><br></p>') {
            toast.error('Please add some content to your article.')
            return
        
        }

        // check the user

        // if the user is not logged in , redirect to sign in page

        if(!user) {
            toast.error('You  must be signed in to save an article.')
            navigate('/signin')
            return
        }


        let uploadedImageData = null

        // check if there is a selected image that hasn`t been uploaded yet.

        if(selectedImage) {
            console.log('Selected image needs to be uploaded first:',selectedImage)
            const shouldUpload = confirm('You have a selected image that has hasn`t been uploaded yet,would you like to upload it now.?')

            if(shouldUpload) {
                try {
                    uploadedImageData = await handleUploadImage()
                    console.log('Image uploaded during save: ',uploadedImageData)
                    
                    // wait a moment for the state to update
                    await new Promise(resolve => setTimeout(resolve,100))

                } catch (error) {
                    console.error('Image uploaded during save: ',error)
                    toast.error('Failed to upload image, Please try uploading the image first.')
                    return
                }
            }
        }else {
            // if the user doesn`t want to upload the image, ask if they want to proceed without it.
            const shouldProceed = confirm('Do you want to upload without an image.?')

            if(!shouldProceed) {
                return
            }
            // clear the selected image since the user choose not to upload
            setSelectedImage(null)

            if(fileInputRef.current) {
                fileInputRef.current.value = ''
            }
        
        }

        setIsSaving(true)

        console.log('Starting article save with states: ',{
            isEditMode,
            featuredImageUrl,
            imagePath,
            selectedImage,
            uploadedImageData,
        })


        try {

            //Determine if we should update the publish status
            
            const published = publishedStatus !== null ? publishedStatus : isPublished

            // Get the current image state, preffering newly uploaded image if is available

            const currentImageUrl = uploadedImageData?.url || featuredImageUrl
            const currentImagePath = uploadedImageData?.path || imagePath 

            console.log('Current image state: ',{
                featuredImageUrl: currentImageUrl,
                imagePath: currentImagePath,
                selectedImage,
                uploadedImageData,
            })
            
            const articleData = {
                title,
                content,
                tags: selectedTags,
                authorId: user.id,
                published,
                featuredImageUrl: currentImageUrl,

            }

            console.log('Saving article with data:', articleData)

            let savedArticle

            // update

            if(isEditMode) {
                // update function
                savedArticle = await updateArticle(id,articleData)
                // setTitle(savedArticle.title)

            }else {
                // insert or create new article
                savedArticle = await createArticle(articleData)
            }

            console.log(' Article saved successfully:', savedArticle)
            toast.success(`Article ${isEditMode ? 'updated' : 'created' } successfuly! `)

           
            
        } catch (error) {
            console.error('Error saving articles:',error)
            toast.error('Failed to save your article. Please try again later.')
        }
        finally {
            setIsSaving(false)
        }

        
    }

    return (
        <div className='max-w-4xl mx-auto px-4 py-8 '>

            {/* header buttons */}

            <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
                <h1 className="text-2xl font-bold text-900 mb-4 md:mb-0">
                    {isEditMode ? 'Edit Article' : 'Create New Article'}
                </h1>

                {/* buttons */}

                <div className="flex space-x-4">
                    <button className='px-4 py-2 border-gray-300 rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 cursor-pointer'>
                        <X  className='inline mr-2' size={17}/>
                        Cancel
                    </button>
                    <button className='px-4 py-2 border-gray-300 rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'>
                        <Save className='inline mr-2' size={17}/>
                        {/* {isEditMode ? 'Updating...': 'Update as Draft'}  */}
                        {isSaving ? 'saving...' : 'Save as Draft'}
                    </button>
                    <button className='px-4 py-2 border-gray-300 rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'>
                        <Save className='inline mr-2' size={17}/>
                        {/* {isEditMode ? 'Updaing...' : 'update and Publish'} */}
                        {isSaving ? 'saving...' : 'Save and Publish'}
                    </button>
                </div>

            </div>

            {/* title input  */}

            <div className="mb-6">
                <label htmlFor="title" className='block text-sm font-medium text-gray-700'>
                    Title
                </label>
                <input 
                    type="text" 
                    id='title'
                    value={title}
                    onChange={(e)=>setTitle(e.target.value)}
                    placeholder='Enter article title'
                    className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm'
                />
            </div>

            {/* featured images */}

            <div className="mb-6">
                <label className='block text-sm font-medium text-gray-700 mb-2'>Featured Image
                    <button
                    type='button'
                    onClick={()=>toast('Maximum image size allowed is 5MB')}
                    className='ml-2 text-xs text-gray-500 hover:text-gray-700 cursor-pointer'
                    >
                        <Info className='inline-block' size={16}/>
                    </button>
                </label>
            </div>

            {/* simplified image upload UI preview */}

            <div className="mb-4">
                <div className="flex flex-col space-y-2">
                    <div className="flex items-center space-x-2">
                        <input 
                            type="file" 
                            id='featured-image'
                            accept='image/*'
                            onChange={handleImageSelect}
                            ref={fileInputRef}
                            className='text-sm text-gray-500 file:mr-Z file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:bg-orange-100 cursor-pointer'
                        />

                        {/* when we choose the file */}

                        {selectedImage && (
                            <button 
                                type='button'
                                onClick={async()=>{
                                    try {
                                        await handleUploadImage()
                                    } catch (error) {
                                        console.error('Failed to upload image: ',error)
                                        toast.error('Failed to upload image. Please try again.')
                                    }
                                }}
                                disabled={isUploading}
                                className='px-3 py-2 bg-orange-500 text-white rounded-md text-sm hover:bg-orange-600 disabled:opacity-50'
                            >
                                {isUploading ? 'Uploading...' : 'Upload'}
                            </button>
                        )}

                    </div>
                </div>
            </div>

            {/* Display currently stored image */}

            {featuredImageUrl && (
                <div className="mt-2 mb-4">
                    <img 
                        src={featuredImageUrl} 
                        alt="featured-image" 
                        className='w-full max-h-64 object-cover rounded-md'
                    />
                    <div className="flex justify-between items-center mt-1">
                        <span className='text-xs text-gray-500 truncate max-w-[80%]'>
                            {featuredImageUrl}
                        </span>
                        <button
                            type='button' 
                            className='text-red-500 text-xs hover:text-red-700'
                        >
                            Remove
                        </button>
                    </div>
                </div>
            )}

            {/* Tags selection */}

            <div className="mb-6 relative">
                <label className="block text-sm font-medium to-gray-700 mb-1">
                    Tags
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                    {selectedTags.map(tag=>(
                        <span 
                            key={tag}
                            className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800 cursor-pointer'
                        >
                            {tag}
                            <button
                                type='button'
                                className='ml-1.5 inline-flex text-orange-500 hover:text-orange-700 focus:outline-none cursor-pointer'
                                onClick={()=>toggleTag(tag)}
                            >
                                <span className='sr-only'>Remove tag {tag}</span>
                                <X  size={12}/>

                                {/* <X className='w-1 h-1' stroke='currentColor' fill='none' viewBox='0 0 8 8'>
                                    <path strokeLinecap='round' strokeWidth='1.5' d='M11l6 6m0-6L1 7'/>
                                </X> */}

                            </button>
                        </span>
                    ))}
                </div>

                {/* Add tag button */}

                <button
                    type='button'
                    className='inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 cursor-pointer'
                    onClick={()=>setIsTagMenuOpen(!isTagMenuOpen)}
                >
                    <Tag className='mr-1.5 w-4 h-4' />
                    Add Tags 
                </button>

                {isTagMenuOpen && (
                    <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                        <div className="grid grid-cols-2 gap-2 p-2">
                            {AVAILABLE_TAGS.map(tag=>(
                                <div 
                                    key={tag}
                                    className={ `cursor-pointer px-3 py-2 rounded hover:bg-gray-100 ${selectedTags.includes(tag) ? 'bg-orange-50 text-orange-700' : '' } ` }
                                    onClick={()=>toggleTag(tag)}
                                >   
                                    {tag}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </div>

            {/* Recall QuillEditor */}

            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Content
                </label>
                <QuillEditor
                    ref={editorRef}
                    value={content}
                    onChange={handleContentChange}
                    placeholder='write your article content here...'
                    height='500'
                />

                {/*  table content buttons */}

                <div className="px-6 py-4 md:px-10 flex justify-end space-x-4">
                    <button
                        onClick={()=>handleSave(false)} 
                        className='px-4 py-2 border border-gray-300 rounded-md shadow-sm text-gray-700  text-sm bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500  focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'>
                        {isEditMode ? 'Update as Draft': 'Save as Draft'} 
                        {/* {isSaving ? 'Saving...' : 'Save as Draft' } */}
                    </button>
                    <button
                        onClick={()=>handleSave(true)} 
                        className='px-4 py-2 border border-transparent rounded-md shadow-sm text-white text-sm bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500  focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'>
                        {isEditMode ? 'Update and Publish' : 'Save and Publish' } 
                        {/* {isSaving ? 'Saving...' : 'Save and Publish' } */}
                    </button>
                </div>
                
            </div>

       

           

          

        </div>


    );
}
