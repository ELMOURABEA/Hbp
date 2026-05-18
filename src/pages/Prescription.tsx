import { useState } from "react";
import { Upload, CheckCircle, Clock, AlertCircle, FileText, Send } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import React from "react";
import { cn } from "@/src/lib/utils";

export default function Prescription() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<'idle' | 'uploading' | 'success'>('idle');
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !phoneNumber) return;

    setStatus('uploading');
    
    // Simulate upload
    setTimeout(() => {
      setStatus('success');
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider mb-6">
            Prescription Service
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 font-serif mb-6 leading-tight">
            Order your medication <br /><span className="text-brand-red italic">digitally.</span>
          </h1>
          <p className="text-lg text-slate-600 mb-10 leading-relaxed">
            Skip the queue. Upload a photo or PDF of your prescription, and our expert pharmacists will verify and prepare your order for delivery or pickup.
          </p>

          <div className="space-y-8">
            {[
              {
                icon: Upload,
                title: "Upload Prescription",
                desc: "Securely upload your valid medical prescription."
              },
              {
                icon: Clock,
                title: "Pharmacist Review",
                desc: "Our clinical pharmacists verify the dosage and availability."
              },
              {
                icon: CheckCircle,
                title: "Ready for Delivery",
                desc: "We confirm with you and dispatch your personalized health package."
              }
            ].map((step, i) => (
              <div key={i} className="flex gap-4">
                <div className="shrink-0 w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 shadow-sm">
                  <step.icon size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">{step.title}</h3>
                  <p className="text-sm text-slate-500">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 bg-amber-50 rounded-2xl border border-amber-100 flex gap-4">
            <AlertCircle className="text-amber-600 shrink-0" size={24} />
            <div className="text-sm text-amber-800 leading-relaxed">
              <strong>Requirement:</strong> Please ensure the prescription is clearly legible and includes the doctor's name, signature, and date of issue.
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[32px] p-8 md:p-10 shadow-2xl shadow-slate-200/60 border border-slate-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 text-slate-50">
            <FileText size={120} strokeWidth={0.5} />
          </div>

          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle size={40} />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Prescription Received!</h2>
                <p className="text-slate-600 mb-8">
                  Our team is now reviewing your prescription. You will receive a WhatsApp confirmation at <strong>{phoneNumber}</strong> within 15-30 minutes.
                </p>
                <button 
                  onClick={() => {setStatus('idle'); setFile(null); setPhoneNumber("");}}
                  className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors"
                >
                  Upload Another
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="relative z-10">
                <h2 className="text-2xl font-bold text-slate-900 mb-8">Service Request</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-900 mb-2">WhatsApp Number</label>
                    <input 
                      type="tel"
                      required
                      placeholder="e.g. 01200400094"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-brand-red transition-all"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    <p className="mt-1.5 text-[10px] text-slate-500 uppercase tracking-wider font-bold">We will call or text you for confirmation</p>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-900 mb-2">Attachment</label>
                    <div 
                      className={cn(
                        "relative group border-2 border-dashed rounded-2xl p-10 transition-all text-center",
                        file ? "border-green-200 bg-green-50" : "border-slate-200 bg-slate-50 hover:border-slate-300"
                      )}
                    >
                      <input 
                        type="file" 
                        id="prescription-file"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        accept="image/*,application/pdf"
                        onChange={handleFileChange}
                      />
                      <div className="flex flex-col items-center">
                        <div className={cn(
                          "w-12 h-12 rounded-full flex items-center justify-center mb-4 transition-colors",
                          file ? "bg-green-100 text-green-600" : "bg-white text-slate-400 group-hover:text-brand-red"
                        )}>
                          {file ? <CheckCircle size={28} /> : <Upload size={28} />}
                        </div>
                        <div className="text-sm font-bold text-slate-900 mb-1">
                          {file ? file.name : "Choose File or Drag & Drop"}
                        </div>
                        <div className="text-xs text-slate-500">
                          {file ? `${(file.size / 1024).toFixed(1)} KB` : "Supports PNG, JPG, PDF (Max 10MB)"}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-900 mb-2">Special Instructions (Optional)</label>
                    <textarea 
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-brand-red transition-all h-24 resize-none"
                      placeholder="Specify generic preferences, allergy info, or delivery details..."
                    />
                  </div>

                  <button
                    disabled={status === 'uploading' || !file || !phoneNumber}
                    className="w-full bg-brand-red text-white py-4 rounded-2xl font-bold shadow-xl shadow-red-200 hover:bg-brand-red-dark disabled:opacity-50 disabled:shadow-none transition-all flex items-center justify-center gap-2"
                  >
                    {status === 'uploading' ? (
                      <>
                        <motion.div 
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          <Clock size={20} />
                        </motion.div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        Submit Prescription
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
