import { BadgeDollarSign, Book, BookOpen, Calendar, CardSim, ChartBarBig, ChartPie, CreditCard, Delete, DollarSign, Drumstick, Edit, EditIcon, Eye, EyeOff, FastForward, File, FilePen, Flashlight, HandCoins, Pin, Plus, Power, Trash, Trash2, TrendingDown, TrendingUp, X, Zap } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { DashboardCharts } from '../components/DashboardCharts'
import { Sidebar } from '../components/Sidebar'
import { Topbar } from '../components/Topbar'

// import { useNavigate } from 'react-router'

export const Dashboard = () => {

  const { register, handleSubmit, reset, formState: { errors } } = useForm()
  const [isSaleDataAdded, setIsSaleDataAdded] = useState(false)
  const [showExpenses, setShowExpenses] = useState(false)
  const [showIncome, setShowIncome] = useState(false)
  const [showProfit, setShowProfit] = useState(false)
  // const [successModal, setSuccessModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [recordData, setRecordData] = useState(() => {
    const saved = localStorage.getItem('records')
    return saved ? JSON.parse(saved) : []
  })
  // const [editRecordIndex, setEditRecordIndex] = useState(null)
  // const [editRecordData, setEditRecordData] = useState(null)

  useEffect(() => {
    localStorage.setItem('records', JSON.stringify(recordData))
  }, [recordData])

  const onSubmit = async (data) => {

    setIsLoading(true)

    try {
      setRecordData(prev => [...prev, data]) // this stores the data

      setTimeout(() => {

        toast.success('Record is added Successfully')
        setIsLoading(false)
        reset()

        setTimeout(() => {

          setIsSaleDataAdded(false)

        }, 1500);

      }, 1000);

    } catch (error) {
      console.error('', error)
      toast.error('You have failed to add to records')
      setIsLoading(false)
    }

  }


  const handleDeleteData = (index) => {
    const ok = window.confirm(`Are you sure you wana delete this ${(index + 1)} data`)

    if (!ok) {
      return
    }

    setRecordData(prev => prev.filter((_, r) => r !== index))
    toast.success(`Record ${index + 1} has been successfully deleted`)
  }


  const totals = recordData.reduce(
    (acc, item) => {
      const out = Number(item.out) || 0
      const cash = Number(item.cash) || 0
      const card = Number(item.card) || 0
      const electricity = Number(item.electricity) || 0

      acc.totalIncome += cash + card
      acc.totalExpenses += out + electricity
      acc.totalProfit += (cash + card) - (out + electricity)

      return acc
    },
    {
      totalIncome: 0,
      totalExpenses: 0,
      totalProfit: 0,
    }
  )



  return (
    <div className="max-w-5xl mx-auto gap-3 text-white">

      {/* Title */}

      <div>
        <h1 className="mt-5 text-center text-3xl font-bold">
          Dawood
          <span className='pl-3 text-orange-600'>Shop2</span>
        </h1>
      </div>

      {/* dashboard layout */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-8">

        {/* Total Expenses */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-400 to-rose-600 p-6 shadow-lg hover:shadow-2xl transition-all duration-300">
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/20 rounded-full" />

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/80">Total Expenses</p>
              <h2 className="text-3xl font-bold text-white mt-1 tabular-nums">
                {showExpenses ? `R ${totals.totalExpenses.toLocaleString()}` : '●●●●●'}
              </h2>
            </div>

            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/30">
              <TrendingDown className="text-white" size={26} />
            </div>
          </div>
          <div
            className="absolute top-5.5 left-35 text-white cursor-pointer"
            onClick={() => setShowExpenses(!showExpenses)}
          >
            {showExpenses ? <Eye /> : <EyeOff />}
          </div>
        </div>

        {/* Total Income */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-400 to-emerald-600 p-6 shadow-lg hover:shadow-2xl transition-all duration-300">
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/20 rounded-full" />

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/80">Total Income</p>
              <h2 className="text-3xl font-bold text-white mt-1 tabular-nums">
                {showIncome ? `R ${totals.totalIncome.toLocaleString()}` : '●●●●●'}
              </h2>
            </div>

            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/30">
              <TrendingUp className="text-white" size={26} />
            </div>
          </div>

          <div
            className="absolute top-5.5 left-35 text-white cursor-pointer"
            onClick={() => setShowIncome(!showIncome)}
          >
            {showIncome ? <Eye /> : <EyeOff />}
          </div>
        </div>

        {/* Net Profit */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 p-6 shadow-lg hover:shadow-2xl transition-all duration-300">
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/20 rounded-full" />

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/80">Net Profit</p>
              <h2 className="text-3xl font-bold text-white mt-1 tabular-nums">
                {showProfit ? `R ${totals.totalProfit.toLocaleString()}` : '●●●●●'}
              </h2>
            </div>

            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/30">
              <DollarSign className="text-white" size={26} />
            </div>
          </div>
          <div
            className="absolute top-5.5 left-35 text-white cursor-pointer"
            onClick={() => setShowProfit(!showProfit)}
          >
            {showProfit ? <Eye /> : <EyeOff />}
          </div>
        </div>

      </div>

      {/* input Field */}

      <form
        className="flex items-center gap-3"
        onSubmit={handleSubmit()}
      >
        <label className='w-full relative'>

          <input
            type="text"
            placeholder='Enter Your Daily Expenses...'
            className='  w-full h-11 pl-11
            bg-white/10 border border-white/20
            rounded-xl text-white placeholder-white/60
            focus:ring-2 focus:ring-cyan-400 outline-none'
          />
          <div className="absolute top-2.5 left-3">
            <FilePen className='w-6 h-6' />
          </div>
        </label>

        {/* input button */}

        <button
          type='submit'
          className='flex justify-center items-center gap-2 w-35 h-11 bg-orange-500 hover:bg-orange-600 text-white text-lg rounded-md cursor-pointer'
          onClick={() => setIsSaleDataAdded(!isSaleDataAdded)}
          disabled={isLoading}
        >
          {isLoading && (
            <span className="w-5 h-5 border-4 border-gray-300 border-t-green-500 rounded-full animate-spin"></span>
          )}
          <span className='text-sm md:text-md'>
            {isLoading ? 'Adding...' : 'Add Record'}
          </span>

        </button>

      </form>

      {isLoading && (
        <div className="space-y-3 animate-pulse">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-20 bg-gray-200 rounded-xl" />
          ))}
        </div>
      )}


      {/* ================= RECORDS TABLE ================= */}
      {recordData.length > 0 && (
        <div className="mt-8">

          {/* ================= DESKTOP TABLE ================= */}
          <div className="hidden md:block overflow-x-auto rounded-2xl shadow-lg border border-gray-200 bg-white">
            <table className="w-full border-collapse">

              <thead className="bg-gradient-to-r from-orange-500 to-orange-600 text-white sticky top-0 z-10">
                <tr>
                  <th className="px-4 py-3 text-left border-r border-orange-400">#</th>
                  <th className="px-4 py-3 text-left border-r border-orange-400">Date</th>
                  <th className="px-4 py-3 text-left border-r border-orange-400">Out</th>
                  <th className="px-4 py-3 text-left border-r border-orange-400">Card</th>
                  <th className="px-4 py-3 text-left border-r border-orange-400">Cash</th>
                  <th className="px-4 py-3 text-left border-r border-orange-400">Electricity</th>
                  <th className="px-4 py-3 text-left border-r border-orange-400">Total</th>
                  <th className="px-4 py-3 text-left">Actions</th>
                </tr>
              </thead>

              <tbody>
                {recordData.map((item, index) => {
                  const total =
                    Number(item.cash) +
                    Number(item.card) -
                    Number(item.out) -
                    Number(item.electricity)

                  return (
                    <tr
                      key={index}
                      className="group border-b last:border-b-0 hover:bg-orange-50 transition"
                    >
                      <td className="px-4 py-3 border-r ">
                        {index + 1}
                      </td>

                      <td className="px-4 py-3 border-r font-medium ">
                        {item.date}
                      </td>

                      <td className="px-4 py-3 border-r text-red-500">
                        R {item.out}
                      </td>

                      <td className="px-4 py-3 border-r text-green-600">
                        R {item.card}
                      </td>

                      <td className="px-4 py-3 border-r text-cyan-600">
                        R {item.cash}
                      </td>

                      <td className="px-4 py-3 border-r text-yellow-600">
                        R {item.electricity}
                      </td>

                      <td className="px-4 py-3 border-r font-semibold text-blue-700">
                        R {total}
                      </td>

                      <td className="px-4 py-3">
                        <div className="flex gap-2 opacity-70 group-hover:opacity-100 transition">
                          <button className="p-2 bg-white border rounded-full hover:bg-green-50 hover:border-green-400">
                            <Edit className="w-4 h-4 text-green-700" />
                          </button>

                          <button
                            onClick={() => handleDeleteData(index)}
                            className="p-2 bg-white border rounded-full hover:bg-red-50 hover:border-red-400"
                          >
                            <Trash2 className="w-4 h-4 text-red-700" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>

            </table>
          </div>

          {/* ================= MOBILE CARDS ================= */}
          <div className="md:hidden space-y-4">

            {recordData.map((item, index) => {
              const total =
                Number(item.cash) +
                Number(item.card) -
                Number(item.out) -
                Number(item.electricity)

              return (
                <div
                  key={index}
                  className="bg-white/25 rounded-2xl shadow-md border border-gray-200 p-4"
                >
                  {/* Header */}
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm ">{item.date}</span>
                    <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full">
                      #{index + 1}
                    </span>
                  </div>

                  {/* Data */}
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <p className="text-red-500 font-medium">Out: R {item.out}</p>
                    <p className="text-green-600 font-medium">Card: R {item.card}</p>
                    <p className="text-cyan-600 font-medium">Cash: R {item.cash}</p>
                    <p className="text-yellow-600 font-medium">
                      Electricity: R {item.electricity}
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="flex justify-between items-center mt-4 pt-3 border-t">
                    <p className="font-bold text-blue-700">
                      Total: R {total}
                    </p>

                    <div className="flex gap-2">
                      <button className="p-2 bg-gray-100 rounded-full hover:bg-green-100">
                        <Edit className="w-4 h-4 text-green-700" />
                      </button>

                      <button
                        onClick={() => handleDeleteData(index)}
                        className="p-2 bg-gray-100 rounded-full hover:bg-red-100"
                      >
                        <Trash2 className="w-4 h-4 text-red-700" />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}

          </div>

        </div>
      )}


      {/* Expenses tracker form */}


      {isSaleDataAdded && (
        <div className='fixed inset-0 bg-black/80 bg-opacity-50 flex justify-center items-center z-50'>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className=' relative w-sm md:w-lg mx-auto space-y-3 mt-6 px-6 py-10 bg-white/20 backdrop:blur-xl shadow-2xl  rounded-2xl'
          >
            <div className="flex justify-center items-center gap-3 ">
              {/* <span> <ChartPie/> </span> */}
              <h1 className='text-center text-lg'>Please Fill this Form Based on Your Daily Business Sales</h1>
            </div>

            {/* date => money you have spent */}

            <label className="relative">
              Date

              <input
                type="date"
                placeholder='Date'
                className='w-full h-11 border-2 pl-12 border-gray-500 focus:border-none focus:dateline-none focus:ring-2 focus:ring-orange-500 rounded-md'
                {...register('date', {
                  required: 'Fadlan gali taariikhda manta '
                })}
              />
              
              <div className="absolute top-7 left-3">
                <Calendar className='text-orange-400 w-6 h-6' />
              </div>

            </label>

            {errors.date && (
              <p className="text-red-500 text-sm">
                {errors.date.message}
              </p>
            )}

            {/* out => money you have spent */}

            <div className="relative">

              <input
                type="number"
                placeholder='Out'
                className='w-full h-11 border-2 pl-12 border-gray-500 focus:border-none focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-md'
                {...register('out', {
                  required: 'Fadlan gali lacagta kaa baxday manta '
                })}
              />
              <div className="absolute top-7 left-3">
                <HandCoins className='text-red-500 w-6 h-6' />
              </div>

            </div>

            {errors.out && (
              <p className="text-red-500 text-sm">
                {errors.out.message}
              </p>
            )}

            {/* card => money you have recieved */}

            <div className="relative">

              <input
                type="number"
                placeholder='Card'
                className='w-full h-11 border-2 pl-12 border-gray-500 focus:border-none focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-md'
                {...register('card', {
                  required: 'Fadlan gali lacagta aad card ahaan u qabaty.'
                })}
              />
              <div className="absolute top-7 left-3">
                <CreditCard className='text-cyan-500 w-6 h-6' />
              </div>

            </div>

            {errors.card && (
              <p className="text-red-500 text-sm">
                {errors.card.message}
              </p>
            )}

            {/* cash => money you have recieved */}

            <div className="relative">

              <input
                type="number"
                placeholder='Cash'
                className='w-full h-11 border-2 pl-12 border-gray-500 focus:border-none focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-md'
                {...register('cash', {
                  required: 'Fadlan gali lacagta aad cash ahaan u qabaty(lacagta haraaga ah)'
                })}
              />
              <div className="absolute top-7 left-3">
                <DollarSign className='text-green-500 w-6 h-6' />
              </div>

            </div>

            {errors.cash && (
              <p className="text-red-500 text-sm">
                {errors.cash.message}
              </p>
            )}


            {/* Electricty you have sold */}

            <div className="relative">

              <input
                type="number"
                placeholder='Electricity'
                className='w-full h-11 border-2 pl-12 border-gray-500 focus:border-none focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-md'
                {...register('electricity', {
                  required: 'Fadlan gali lacagta aad airtime ama koronto ahaan u gaday'
                })}
              />
              <div className="absolute top-7 left-3">
                <Zap className='text-yellow-400 w-6 h-6' />
              </div>

            </div>

            {errors.electricity && (
              <p className="text-red-500 text-sm">
                {errors.electricity.message}
              </p>
            )}


            {/* button => submitting after registering your expenses*/}

            <button
              type="submit"
              className="flex justify-center items-center gap-2 w-full py-3 bg-gradient-to-r from-orange-400 to-orange-600
              hover:from-orange-500 hover:to-orange-700
              font-semibold text-white text-lg rounded-md cursor-pointer"
              // onClick={onSubmit}
              disabled={isLoading}
            >
              {isLoading && (
                <span className="w-5 h-5 border-4 border-gray-300 border-t-green-500 rounded-full animate-spin"></span>
              )}
              <span className='text-sm md:text-md'>
                {isLoading ?
                  ('Saving...') : (
                    <div className='flex items-center gap-2'>
                      <FilePen size={22} />
                      Save Record'
                    </div>)}
              </span>
            </button>

            <button
              onClick={() => setIsSaleDataAdded(!isSaleDataAdded)}
              className="absolute -top-2 -right-2 bg-orange-400 hover:bg-amber-600 w-7 h-7 flex justify-center items-center rounded-full cursor-pointer ">
              <X className='w-5 h-5' />
            </button>


          </form>
        </div>
      )}

       <div className="py-7">
        <h1 className='text-3xl text-center'>Charts</h1>
        <DashboardCharts recordData={recordData} />

      </div>


    </div>
  )
}
