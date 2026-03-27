import { v4 as uuidv4} from 'uuid'
import supabase from './supabase'
export const uploadImage = async (userId,file,bucket='featured_image') => {
    try {
        // 1: fileExtension eg: shiiqaalow.jpeg
        // pop: cuts the first array element

        const fileExt = file.name.split('.').pop().toLowerCase()
        const filename = `${uuidv4()}.${fileExt}`
        const filePath = `${userId}/${filename}`

        // upload to supabase

        const { data,error } = await supabase.storage
        .from(bucket)
        .upload(filePath,file,{
            contentType: file.type,
            cacheControl: 3600,
            upsert: true
        })

        if(error) throw error

        const { data:urlData } =  supabase.storage
        .from(bucket)
        .getPublicUrl(filePath)

        return {
            path: filePath,
            url: urlData.publicUrl
        }

    } catch (error) {
        console.error('Error uploading image:',error)
        throw error
    }
}