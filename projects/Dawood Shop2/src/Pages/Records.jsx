import {
  Zap,
  PlusCircle,
  Eye,
  EyeOff,
  X,
  CreditCard,
  Banknote,
  TrendingUp,
  TrendingDown,
  Minus,
  HandCoins,
  Calendar,
  Moon,
  Trash
} from "lucide-react";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { createRecord } from "../lib/record";

// ================= PAGE =================

export const Records = () => {

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const [showModal, setShowModal] = useState(true);
  const [records, setRecords] = useState([]);

  const [showOut, setShowOut] = useState(true);
  const [showCard, setShowCard] = useState(true);
  const [showCash, setShowCash] = useState(true);
  const [showElectricity, setShowElectricity] = useState(true);
  const [showTotal, setShowTotal] = useState(true);

  const [isSaving, setIsSaving] = useState(false);

  const navigate = useNavigate();
  const { user } = useAuth();

  // ================= SUBMIT =================

  const onSubmit = async (data) => {

    if (!user) {
      toast.error("Sign in required");
      navigate("/signin");
      return;
    }

    const clean = {
      out: Number(data.out),
      card: Number(data.card),
      cash: Number(data.cash),
      electricity: Number(data.electricity)
    };

    const rowTotal =
      clean.out + clean.card + clean.cash - clean.electricity;

    const recordData = {
      ...clean,
      total: rowTotal,
      author_id: user.id,
      published: true
    };

      setIsSaving(true);

    try {

      const savedRecord = await createRecord(recordData);
      toast.success("Record saved successfully");
      setRecords(prev => [savedRecord || recordData, ...prev]);
      reset();
      setShowModal(false);

    } catch (err) {
      console.error(err);
      toast.error("Save failed");
    } finally {
      setIsSaving(false);
    }
  };

  // ================= DELETE =================

  const deleteRow = (index) => {
    const copy = [...records];
    copy.splice(index, 1);
    setRecords(copy);
    toast.success("Record Removed");
  };

  // ================= TOTALS =================

  const totals = records.reduce(
    (acc, r) => {
      acc.out += Number(r.out) || 0;
      acc.card += Number(r.card) || 0;
      acc.cash += Number(r.cash) || 0;
      acc.electricity += Number(r.electricity) || 0;
      return acc;
    },
    { out: 0, card: 0, cash: 0, electricity: 0 }
  );

  const totalSum =
    totals.out + totals.card + totals.cash - totals.electricity;

  // ================= UI =================

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-700 text-white">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Records Dashboard</h1>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-white text-purple-700 px-4 py-2 rounded-xl font-medium shadow hover:scale-105 transition"
        >
          <PlusCircle size={18}/>
          Add Record
        </button>
      </div>

      {/* CARDS */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        <StatCard title="Out" value={totals.out} show={showOut} toggle={() => setShowOut(!showOut)} icon={<HandCoins size={22}/>} gradient="from-red-400 to-pink-400" gradient1="from-rose-400 to-pink-400"/>

        <StatCard title="Card" value={totals.card} show={showCard} toggle={() => setShowCard(!showCard)} icon={<CreditCard size={22}/>} gradient="from-yellow-400 to-green-400" gradient1="from-green-400 to-yellow-400"/>

        <StatCard title="Cash" value={totals.cash} show={showCash} toggle={() => setShowCash(!showCash)} icon={<Banknote size={22}/>} gradient="from-green-600 to-cyan-400" gradient1="from-cyan-400 to-green-400"/>

        <StatCard title="Electricity" value={totals.electricity} show={showElectricity} toggle={() => setShowElectricity(!showElectricity)} icon={<Zap size={22}/>} gradient="from-pink-500 to-yellow-400" gradient1="from-yellow-400 to-pink-400"/>

        <StatCard title="Total Sum" value={totalSum} show={showTotal} toggle={() => setShowTotal(!showTotal)} icon={<TrendingUp size={22}/>} gradient="from-rose-400 to-blue-600" gradient1="from-blue-400 to-rose-400"/>

        <StatCard title="This Month vs Last" value={totalSum} show={showTotal} toggle={() => setShowTotal(!showTotal)} icon={<Moon size={22}/>} gradient="from-rose-400 to-blue-600" gradient1="from-blue-400 to-rose-400"/>

        <StatCard title="This Year vs Last" value={totalSum} show={showTotal} toggle={() => setShowTotal(!showTotal)} icon={<Calendar size={22}/>} gradient="from-rose-400 to-blue-600" gradient1="from-blue-400 to-rose-400"/>

      </div>


      {/* TABLE */}
      <div className="mt-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6">

        <h2 className="text-xl font-semibold mb-4">Saved Records</h2>

        <table className="w-full text-sm">

          <thead className="text-left text-white/70 border-b border-white/20">
            <tr>
              <th>#</th>
              <th>Out</th>
              <th>Card</th>
              <th>Cash</th>
              <th>Electricity</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {records.length === 0 && (
              <tr>
                <td colSpan="7" className="py-4 text-center text-white/60">
                  No records yet
                </td>
              </tr>
            )}

            {records.map((r, i) => {

              const rowTotal =
                Number(r.out) +
                Number(r.card) +
                Number(r.cash) -
                Number(r.electricity);

              return (
                <tr key={i} className="border-b border-white/10 hover:bg-white/10">
                  <td>{i + 1}</td>
                  <td>R {r.out}</td>
                  <td>R {r.card}</td>
                  <td>R {r.cash}</td>
                  <td>R {r.electricity}</td>
                  <td>R {rowTotal}</td>
                  <td>
                    <button
                      onClick={() => deleteRow(i)}
                      className="p-2 bg-red-500/20 rounded hover:bg-red-500/40"
                    >
                      <Trash size={16}/>
                    </button>
                  </td>
                </tr>
              )
            })}

          </tbody>
        </table>
      </div>


      {/* MODAL */}

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="relative my-8 space-y-4 bg-white/10 backdrop-blur-xl border border-white/20 text-white p-8 rounded-2xl shadow-2xl"
          >

            <h2 className="text-xl font-semibold">Add Record</h2>

            {["out","card","cash","electricity"].map(name => (
              <div key={name} className="flex flex-col">
                <input
                  type="number"
                  placeholder={name}
                  {...register(name,{required:`${name} required`})}
                  className="w-full p-2 rounded-lg bg-white/20 outline-none placeholder-white/50"
                />
                {errors[name] && <span className="text-red-400 text-xs">{errors[name].message}</span>}
              </div>
            ))}

            <button
              type="submit"
              disabled={isSaving}
              className="w-full py-2 rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 font-semibold disabled:opacity-50"
            >
              {isSaving ? "Saving..." : "Save"}
            </button>

            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 p-1 rounded-full bg-white/20 hover:bg-white/30"
            >
              <X/>
            </button>

          </form>
        </div>
  );
};


// ================= STAT CARD =================

const StatCard = ({ title, value, show, toggle, icon, gradient1, gradient }) => {

  return (
    <div className="relative rounded-3xl p-6 backdrop-blur-2xl bg-white/10 border border-white/20 shadow-xl transition hover:-translate-y-1">

      <div className={`absolute inset-0 opacity-50 bg-gradient-to-br ${gradient}`} />

      <div className="relative flex justify-between items-start">

        <div className={`flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient1}`}>
          {icon}
        </div>

        <button
          onClick={toggle}
          className="p-2 rounded-lg bg-white/15 hover:bg-white/30"
        >
          {show ? <Eye size={18}/> : <EyeOff size={18}/>}
        </button>

      </div>

      <div className="relative mt-6">
        <p className="font-bold">{title}</p>
        <h2 className="text-3xl font-semibold">
          {show ? `R ${(value ?? 0).toLocaleString()}` : "●●●●"}
        </h2>
      </div>

    </div>
  );
};
