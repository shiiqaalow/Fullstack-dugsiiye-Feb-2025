import React, { useEffect, useOptimistic, useState, useTransition } from 'react'
import { useAuth } from '../context/AuthContext'
import { Link, useNavigate } from 'react-router'
import {toast} from 'react-hot-toast'
import {
  AlertTriangle,
  Edit,
  Eye,
  Loader,
  PlusCircle,
  Trash,
  Zap,
  EyeOff,
  CreditCard,
  Banknote,
  TrendingUp,
  HandCoins,
  Calendar,
  Moon,
} from 'lucide-react'

import { deleteRecord, getRecordByAuthor } from '../lib/record'

export const Transaction = () => {

  const { user } = useAuth()
  const navigate = useNavigate()

  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [recordToDelete, setRecordToDelete] = useState(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPending, startTransition] = useTransition()

  const [showOut, setShowOut] = useState(true)
  const [showCard, setShowCard] = useState(true)
  const [showCash, setShowCash] = useState(true)
  const [showElectricity, setShowElectricity] = useState(true)
  const [showTotal, setShowTotal] = useState(true)

  const [optimisticRecords, updateOptimisticRecords] = useOptimistic(
    records,
    (state, id) => state.filter(r => r.id !== id)
  )

  // ================= INIT =================
  useEffect(() => {
    if (!user) {
      toast("Session expired — please sign in")
      navigate('signin')
      return
    }
    fetchUserRecords()
  }, [user])

  // ================= FETCH =================
  const fetchUserRecords = async () => {
    try {
      setLoading(true)
      toast.loading("Loading records...", { id: "records-load" })

      const { records } = await getRecordByAuthor(user.id, { limit: 100 })
      setRecords(records)

      toast.success("Records loaded", { id: "records-load" })
    } catch (err) {
      setError("Failed to load records")
      toast.error("Failed loading records", { id: "records-load" })
    } finally {
      setLoading(false)
    }
  }

  // ================= DELETE =================
  const confirmDelete = (record) => {
    setRecordToDelete(record)
    toast("Confirm deletion in popup")
  }

  const handleDelete = async () => {
    if (!recordToDelete) return

    try {
      setIsDeleting(true)
      toast.loading("Deleting record...", { id: "delete" })

      startTransition(() => updateOptimisticRecords(recordToDelete.id))
      await deleteRecord(recordToDelete.id)

      setRecords(prev => prev.filter(r => r.id !== recordToDelete.id))
      setRecordToDelete(null)

      toast.success("Record deleted successfully", { id: "delete" })
    } catch (err) {
      toast.error("Delete failed", { id: "delete" })
      fetchUserRecords()
    } finally {
      setIsDeleting(false)
    }
  }

  // ================= TOTALS =================
  const totals = records.reduce(
    (acc, r) => {
      acc.out += +r.out || 0
      acc.card += +r.card || 0
      acc.cash += +r.cash || 0
      acc.electricity += +r.electricity || 0
      return acc
    },
    { out:0, card:0, cash:0, electricity:0 }
  )

  const totalSum = totals.out + totals.card + totals.cash - totals.electricity

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const month = date.toLocaleString("en-US",{month:"short"})
    const day = date.getDate()
    const year = date.getFullYear().toString().slice(-2)
    return `${month}-${day}-${year}`
  }

  const publishedRecords = optimisticRecords.filter(r => r.published)

  return (
    <div className="min-h-screen text-white bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-700">

      {/* HERO */}
      <div className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500">
        <div className="max-w-7xl px-6 lg:pr-22 mt-20 md:mt-0 py-10 flex justify-between items-center flex-wrap">
          <div>
            <h1 className="text-4xl font-bold">Manage Records</h1>
            <p className="text-orange-100">Track and control your finances</p>
          </div>

          <Link
            to="/dashboard/records"
            className="flex items-center gap-2 bg-white text-orange-600 px-6 py-3 rounded-xl font-semibold shadow hover:scale-105"
          >
            <PlusCircle size={18}/>
            Add Record
          </Link>
        </div>
      </div>

     {/* CARDS */} 
     <div className="max-w-7xl px-5 my-10 md:my-8 lg:px-20 grid md:grid-cols-2 lg:grid-cols-3 gap-6"> 
        <StatCard title="Out" value={totals.out} show={showOut} toggle={() => setShowOut(!showOut)} icon={<HandCoins size={22}/>} /> 
        <StatCard title="Card" value={totals.card} show={showCard} toggle={() => setShowCard(!showCard)} icon={<CreditCard size={22}/>} /> 
        <StatCard title="Cash" value={totals.cash} show={showCash} toggle={() => setShowCash(!showCash)} icon={<Banknote size={22}/>} /> 
        <StatCard title="Electricity" value={totals.electricity} show={showElectricity} toggle={() => setShowElectricity(!showElectricity)} icon={<Zap size={22}/>} /> 
        <StatCard title="Total Sum" value={totalSum} show={showTotal} toggle={() => setShowTotal(!showTotal)} icon={<TrendingUp size={22}/>} />
        <StatCard title="This Month vs Last" value={totalSum} show={showTotal} toggle={() => setShowTotal(!showTotal)} icon={<Moon size={22}/>} /> 
        <StatCard title="This Year vs Last" value={totalSum} show={showTotal} toggle={() => setShowTotal(!showTotal)} icon={<Calendar size={22}/>} />
     </div>

      {/* TABLE */}
      <div className="max-w-7xl px-6 lg:px-22 pb-16">
        <div className="rounded-3xl overflow-hidden shadow-2xl border border-white/20 backdrop-blur-xl bg-white/10">

          <div className="overflow-x-auto">
            <table className="min-w-full text-white">

              <thead className="bg-white/10">
                <tr>
                  {["Date","Out","Card","Cash","Electricity","Total","Actions"]
                    .map(h=>(
                      <th key={h} className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider">
                        {h}
                      </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-white/10">
                {[...publishedRecords].reverse().map(record => (
                  <tr key={record.id} className="hover:bg-white/10">

                    <td className="px-6 py-4 text-center">{formatDate(record.created_at)}</td>
                    <td className="px-6 py-4 text-center">R {record.out}</td>
                    <td className="px-6 py-4 text-center">R {record.card}</td>
                    <td className="px-6 py-4 text-center">R {record.cash}</td>
                    <td className="px-6 py-4 text-center">R {record.electricity}</td>
                    <td className="px-6 py-4 text-center font-bold text-yellow-300">R {record.total}</td>

                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center gap-3">
                        <Link className="p-2 bg-white/10 rounded-lg hover:bg-white/20">
                          <Eye size={18}/>
                        </Link>

                        <Link className="p-2 bg-white/10 rounded-lg hover:bg-white/20">
                          <Edit size={18}/>
                        </Link>

                        <button
                          onClick={()=>confirmDelete(record)}
                          className="p-2 bg-red-500/20 rounded-lg hover:bg-red-500/40"
                        >
                          <Trash size={18}/>
                        </button>
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </div>
      </div>

      {/* DELETE MODAL */}
      {recordToDelete && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
          <div className="bg-white text-black rounded-2xl p-8 shadow-xl w-80">
            <h3 className="text-xl font-bold mb-4">Confirm Delete</h3>
            <p className="mb-6">Delete this record permanently?</p>

            <div className="flex justify-end gap-3">
              <button
                onClick={()=>setRecordToDelete(null)}
                className="px-4 py-2 bg-gray-200 rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg flex items-center gap-2"
              >
                {isDeleting ? <Loader className="animate-spin"/> : <Trash size={16}/>}
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}


// CARD
const StatCard = ({ title, value, show, toggle, icon }) => (
  <div className="rounded-3xl p-6 backdrop-blur-xl bg-white/10 border border-white/20 shadow-xl">
    <div className="flex justify-between">
      <div className="p-3 bg-white/20 rounded-xl">{icon}</div>
      <button onClick={toggle}>
        {show ? <Eye/> : <EyeOff/>}
      </button>
    </div>

    <div className="mt-6">
      <p className="font-semibold">{title}</p>
      <h2 className="text-3xl font-bold">
        {show ? `R ${value.toLocaleString()}` : "••••"}
      </h2>
    </div>
  </div>
)
