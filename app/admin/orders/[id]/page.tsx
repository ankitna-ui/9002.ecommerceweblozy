"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Order } from "@/types";
import { Button } from "@/components/ui/Button";
import { 
  ChevronLeft, 
  Package, 
  User, 
  MapPin, 
  CreditCard, 
  Printer, 
  Trash2, 
  ShieldCheck, 
  FileText,
  Truck,
  CheckCircle2,
  Clock,
  ArrowUpRight
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function OrderDetailsPage() {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();
  const { token } = useAuth();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [showInvoice, setShowInvoice] = useState(false);
  const [previewMode, setPreviewMode] = useState<'pdf' | 'pos'>('pdf');

  useEffect(() => {
    async function fetchOrder() {
      if (!token || !id) return;
      try {
        const res = await fetch("/api/admin/orders", { headers: { "Authorization": token } });
        const data = await res.json();
        const found = data.orders.find((o: Order) => o.id === id);
        setOrder(found || null);
      } catch (error) {
        console.error("Order fetch error:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchOrder();
  }, [id, token]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="h-12 w-12 border-4 border-brand-navy border-t-brand-gold rounded-full animate-spin"></div>
        <p className="font-black uppercase tracking-widest text-sm text-muted-foreground">Retrieving Secure Order Protocol...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="p-20 text-center space-y-4">
        <h2 className="text-4xl font-black uppercase tracking-tighter">Protocol Not Found</h2>
        <p className="text-muted-foreground max-w-md mx-auto">The requested transaction ID <b>{id}</b> could not be located in our secure master records.</p>
        <Button onClick={() => router.push('/admin/orders')} className="bg-brand-navy text-white rounded-2xl px-8 py-6 font-black uppercase tracking-widest text-xs">Return to Registry</Button>
      </div>
    );
  }

  const handlePrint = (mode: 'pdf' | 'pos') => {
    const printWindow = window.open('', '_blank');
    if (!printWindow || !order) return;

    const isPos = mode === 'pos';
    
    const styles = `
      <style>
        @media print {
          @page { margin: ${isPos ? '0' : '1cm'}; size: ${isPos ? '80mm auto' : 'A4'}; }
          body { font-family: 'Inter', sans-serif; color: #1a1a1a; -webkit-print-color-adjust: exact; margin: 0; padding: ${isPos ? '10px' : '20px'}; }
          .invoice-container { width: 100%; max-width: ${isPos ? '100%' : '800px'}; margin: 0 auto; }
          .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 40px; border-bottom: 2px solid #f0f0f0; padding-bottom: 20px; }
          .logo { height: 40px; }
          .title { font-size: 24px; font-weight: 900; text-transform: uppercase; margin: 0; }
          .details { display: grid; grid-template-cols: 1fr 1fr; gap: 40px; margin-bottom: 40px; }
          .pos-header { text-align: center; margin-bottom: 20px; }
          .pos-title { font-size: 18px; font-weight: 900; margin-bottom: 5px; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
          th { text-align: left; font-size: 10px; font-weight: 900; text-transform: uppercase; color: #666; border-bottom: 1px solid #eee; padding: 10px 0; }
          td { padding: 12px 0; font-size: 13px; border-bottom: 1px solid #f9f9f9; }
          .total-section { display: flex; justify-content: flex-end; margin-top: 20px; }
          .total-box { width: 250px; }
          .total-row { display: flex; justify-content: space-between; padding: 8px 0; font-weight: bold; }
          .grand-total { font-size: 20px; font-weight: 900; border-top: 2px solid #1a3e60; padding-top: 15px; margin-top: 10px; }
          .footer { margin-top: 50px; text-align: center; font-size: 10px; color: #999; text-transform: uppercase; letter-spacing: 1px; }
          .brand-color { color: #C7A82F; }
          ${isPos ? `
            .details { grid-template-cols: 1fr; gap: 10px; text-align: center; }
            th, td { font-size: 11px; }
            .grand-total { font-size: 16px; }
            .logo { height: 30px; margin-bottom: 10px; }
          ` : ''}
        }
      </style>
    `;

    const content = `
      <html>
        <head>${styles}</head>
        <body>
          <div class="invoice-container">
            ${isPos ? `
              <div class="pos-header">
                <img src="https://fiorentinidb.com/wp-content/uploads/2023/04/LOGO-Fio-India_CMYK_COLOR-1.png" class="logo" />
                <div class="pos-title">PIETRO FIORENTINI</div>
                <div style="font-size: 10px;">Official Transaction Receipt</div>
              </div>
            ` : `
              <div class="header">
                <div>
                  <img src="https://fiorentinidb.com/wp-content/uploads/2023/04/LOGO-Fio-India_CMYK_COLOR-1.png" class="logo" />
                  <h1 class="title">Tax <span class="brand-color">Invoice</span></h1>
                </div>
                <div style="text-align: right;">
                  <div style="font-weight: 900; font-size: 14px;">PIETRO FIORENTINI DB</div>
                  <div style="font-size: 11px; color: #666;">INV-${order.id.split('-')[1]}</div>
                  <div style="font-size: 11px; color: #666;">${new Date(order.createdAt).toLocaleDateString()}</div>
                </div>
              </div>
            `}

            <div class="details">
              <div>
                <div style="font-size: 9px; font-weight: 900; color: #999; text-transform: uppercase; margin-bottom: 5px;">Customer</div>
                <div style="font-weight: 800;">${order.customerName || 'Guest'}</div>
                <div style="font-size: 12px;">${order.email}</div>
                <div style="font-size: 12px; margin-top: 5px;">${order.address}</div>
              </div>
              ${!isPos ? `
                <div style="text-align: right;">
                  <div style="font-size: 9px; font-weight: 900; color: #999; text-transform: uppercase; margin-bottom: 5px;">Shipping Node</div>
                  <div style="font-weight: 800;">Corporate Park Hub</div>
                  <div style="font-size: 12px;">Milan, Italy</div>
                </div>
              ` : ''}
            </div>

            <table>
              <thead>
                <tr>
                  <th>Description</th>
                  <th style="text-align: center;">Qty</th>
                  <th style="text-align: right;">Total</th>
                </tr>
              </thead>
              <tbody>
                ${order.items.map(item => `
                  <tr>
                    <td style="font-weight: 700;">${item.name.toUpperCase()}</td>
                    <td style="text-align: center;">${item.quantity}</td>
                    <td style="text-align: right; font-weight: 800;">€${(item.quantity * item.price).toLocaleString()}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>

            <div class="total-section">
              <div class="total-box">
                <div class="total-row">
                  <span style="color: #666; font-size: 11px; text-transform: uppercase;">Subtotal</span>
                  <span>€${order.total.toLocaleString()}</span>
                </div>
                <div class="total-row grand-total">
                  <span style="text-transform: uppercase;">Amount Paid</span>
                  <span class="brand-color">€${order.total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div class="footer">
              <p>Thank you for choosing Pietro Fiorentini Solutions</p>
              <p style="font-weight: 900; color: #1a3e60; margin-top: 10px;">Secure Digital Record: ${order.id}</p>
            </div>
          </div>
          <script>window.onload = () => { window.print(); window.close(); }</script>
        </body>
      </html>
    `;

    printWindow.document.write(content);
    printWindow.document.close();
  };

  return (
    <div className="p-8 space-y-10 max-w-[1400px] mx-auto">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-full h-12 w-12 bg-white dark:bg-white/5 shadow-xl">
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Encryption Verified • Session Secure</p>
            </div>
            <h1 className="text-4xl font-black uppercase tracking-tighter">{order.id}</h1>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mt-1">Transaction created on {new Date(order.createdAt).toLocaleString()}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-4">
          <Button 
            onClick={() => handlePrint('pdf')}
            className="bg-brand-navy text-white rounded-2xl px-6 py-6 font-black uppercase tracking-widest text-[10px] gap-2 shadow-xl shadow-brand-navy/20"
          >
            <FileText className="h-4 w-4" /> Download PDF
          </Button>
          <Button 
            variant="outline" 
            onClick={() => handlePrint('pos')}
            className="rounded-2xl px-6 py-6 font-black uppercase tracking-widest text-[10px] gap-2 border-2 hover:bg-muted"
          >
            <Printer className="h-4 w-4" /> Print POS Receipt
          </Button>
          <Button variant="destructive" className="rounded-2xl px-6 py-6 font-black uppercase tracking-widest text-[10px] gap-2 shadow-xl shadow-rose-500/20">
            <Trash2 className="h-4 w-4" /> Terminate Order
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {showInvoice && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100] flex items-center justify-center p-4 md:p-10"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white dark:bg-slate-900 w-full max-w-5xl max-h-[90vh] rounded-[3rem] shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="p-8 border-b border-border flex items-center justify-between bg-muted/30">
                <div className="flex items-center gap-6">
                   <h2 className="text-xl font-black uppercase tracking-tighter">Document Preview</h2>
                   <div className="flex bg-muted p-1 rounded-xl border border-border">
                      <button 
                        onClick={() => setPreviewMode('pdf')}
                        className={`px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${previewMode === 'pdf' ? 'bg-brand-navy text-white shadow-lg' : 'text-muted-foreground hover:text-foreground'}`}
                      >
                        A4 Invoice
                      </button>
                      <button 
                        onClick={() => setPreviewMode('pos')}
                        className={`px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${previewMode === 'pos' ? 'bg-brand-navy text-white shadow-lg' : 'text-muted-foreground hover:text-foreground'}`}
                      >
                        POS Receipt
                      </button>
                   </div>
                </div>
                <div className="flex items-center gap-3">
                  <Button onClick={() => handlePrint(previewMode)} className="bg-brand-gold text-brand-navy hover:bg-brand-gold/90 rounded-xl px-6 font-black uppercase tracking-widest text-[10px] gap-2">
                    <Printer className="h-4 w-4" /> Print {previewMode.toUpperCase()}
                  </Button>
                  <Button variant="ghost" onClick={() => setShowInvoice(false)} className="rounded-xl font-black uppercase tracking-widest text-[10px]">Close</Button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-10 bg-slate-100 dark:bg-slate-800/50 flex justify-center">
                {previewMode === 'pdf' ? (
                  <div className="bg-white text-slate-900 w-full max-w-[800px] shadow-2xl p-16 min-h-[1000px] font-sans">
                     <div className="flex justify-between items-start mb-16 border-b-2 border-slate-100 pb-10">
                        <div>
                          <img src="https://fiorentinidb.com/wp-content/uploads/2023/04/LOGO-Fio-India_CMYK_COLOR-1.png" className="h-10 mb-6" />
                          <h1 className="text-4xl font-black uppercase tracking-tighter">Tax <span className="text-brand-gold">Invoice</span></h1>
                        </div>
                        <div className="text-right">
                          <p className="font-black text-lg uppercase tracking-tight">Pietro Fiorentini DB</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">INV-{order.id.split('-')[1]}</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{new Date(order.createdAt).toLocaleDateString()}</p>
                        </div>
                     </div>

                     <div className="grid grid-cols-2 gap-16 mb-16">
                        <div>
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3">Customer</p>
                          <p className="font-black text-xl uppercase tracking-tighter">{order.customerName || 'Guest'}</p>
                          <p className="text-sm font-medium text-slate-600">{order.email}</p>
                          <p className="text-sm font-medium text-slate-600 mt-2">{order.address}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3">Shipping From</p>
                          <p className="font-black text-xl uppercase tracking-tighter">Corporate Park Hub</p>
                          <p className="text-sm font-medium text-slate-600">Milan, Italy - 20121</p>
                        </div>
                     </div>

                     <table className="w-full mb-16">
                        <thead>
                          <tr className="border-b-2 border-slate-900">
                            <th className="py-4 text-left text-[10px] font-black uppercase tracking-widest">Description</th>
                            <th className="py-4 text-center text-[10px] font-black uppercase tracking-widest">Qty</th>
                            <th className="py-4 text-right text-[10px] font-black uppercase tracking-widest">Unit Price</th>
                            <th className="py-4 text-right text-[10px] font-black uppercase tracking-widest">Total</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {order.items.map((item, i) => (
                            <tr key={i}>
                              <td className="py-6 font-bold uppercase text-sm">{item.name}</td>
                              <td className="py-6 text-center font-bold text-sm">{item.quantity}</td>
                              <td className="py-6 text-right font-bold text-sm">€{item.price.toLocaleString()}</td>
                              <td className="py-6 text-right font-black text-sm">€{(item.quantity * item.price).toLocaleString()}</td>
                            </tr>
                          ))}
                        </tbody>
                     </table>

                     <div className="flex justify-end">
                        <div className="w-80 space-y-4">
                           <div className="flex justify-between text-sm font-bold text-slate-400 uppercase">
                              <span>Subtotal</span>
                              <span className="text-slate-900">€{order.total.toLocaleString()}</span>
                           </div>
                           <div className="flex justify-between text-sm font-bold text-slate-400 uppercase">
                              <span>Tax (0%)</span>
                              <span className="text-slate-900">€0.00</span>
                           </div>
                           <div className="flex justify-between items-center pt-6 border-t-4 border-slate-900">
                              <span className="text-xl font-black uppercase tracking-tighter">Total Paid</span>
                              <span className="text-3xl font-black text-brand-gold">€{order.total.toLocaleString()}</span>
                           </div>
                        </div>
                     </div>

                     <div className="mt-32 text-center border-t border-slate-100 pt-10">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Thank you for your business</p>
                        <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest mt-2">Certified Digital Document: {order.id}</p>
                     </div>
                  </div>
                ) : (
                  <div className="bg-white text-slate-900 w-[320px] shadow-2xl p-8 font-mono">
                     <div className="text-center border-b-2 border-dashed border-slate-300 pb-6 mb-6">
                        <img src="https://fiorentinidb.com/wp-content/uploads/2023/04/LOGO-Fio-India_CMYK_COLOR-1.png" className="h-6 mx-auto mb-4 grayscale" />
                        <p className="font-black text-sm">PIETRO FIORENTINI DB</p>
                        <p className="text-[10px]">Official Receipt</p>
                     </div>
                     
                     <div className="text-[11px] space-y-1 mb-6">
                        <p>ORDER: {order.id}</p>
                        <p>DATE: {new Date(order.createdAt).toLocaleString()}</p>
                        <p>CUST: {order.customerName || 'GUEST'}</p>
                     </div>

                     <div className="border-b border-dashed border-slate-300 mb-4 pb-2">
                        <div className="flex justify-between text-[10px] font-bold mb-2">
                           <span>ITEM</span>
                           <span>QTY</span>
                           <span>TOTAL</span>
                        </div>
                        {order.items.map((item, i) => (
                           <div key={i} className="flex justify-between text-[11px] mb-1 uppercase">
                              <span className="truncate pr-2">{item.name}</span>
                              <span>{item.quantity}</span>
                              <span>€{(item.quantity * item.price).toLocaleString()}</span>
                           </div>
                        ))}
                     </div>

                     <div className="space-y-1 text-right mb-8">
                        <div className="flex justify-between text-[11px]">
                           <span>SUBTOTAL:</span>
                           <span>€{order.total.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-[12px] font-black">
                           <span>TOTAL PAID:</span>
                           <span>€{order.total.toLocaleString()}</span>
                        </div>
                     </div>

                     <div className="text-center text-[10px] space-y-1">
                        <p>*** THANK YOU ***</p>
                        <p>Visit: fiorentini.com</p>
                     </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
          {/* Items Summary */}
          <Card className="rounded-[2.5rem] border-none shadow-2xl shadow-black/5 overflow-hidden">
            <CardHeader className="bg-muted/30 p-8">
              <CardTitle className="flex items-center gap-2 text-xl font-black uppercase tracking-tight">
                <Package className="h-6 w-6 text-brand-gold" /> Items Specification
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border/50">
                {order.items.map((item, index) => (
                  <div key={index} className="p-8 flex justify-between items-center group">
                    <div className="flex items-center gap-6">
                      <div className="h-16 w-16 rounded-2xl bg-brand-navy/5 flex items-center justify-center font-black text-2xl text-brand-navy group-hover:bg-brand-gold group-hover:text-brand-navy transition-all">
                        {item.name ? item.name[0] : 'P'}
                      </div>
                      <div>
                        <p className="font-black text-lg uppercase tracking-tight leading-tight">{item.name}</p>
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mt-1">
                          Unit Cost: €{item.price} • Allocation: {item.quantity} Units
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-black tracking-tighter">€{(item.quantity * item.price).toLocaleString()}</p>
                      <button className="text-[10px] font-black uppercase tracking-widest text-brand-gold hover:underline flex items-center gap-1 justify-end mt-1">
                        View Product <ArrowUpRight className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-10 bg-brand-navy text-white flex justify-between items-center">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-gold mb-1">Settlement Total</p>
                  <p className="text-3xl font-black tracking-tighter">€{order.total.toLocaleString()}</p>
                </div>
                <div className="text-right">
                   <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50 mb-1">Status</p>
                   <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 text-emerald-400 font-black uppercase tracking-widest text-xs">
                      <CheckCircle2 className="h-4 w-4" /> Fully Processed
                   </div>
                </div>
              </div>
            </CardContent>
          </Card>


          {/* Timeline */}
          <section className="space-y-6">
             <h3 className="text-xl font-black uppercase tracking-tight px-4">Processing Timeline</h3>
             <div className="relative pl-8 space-y-10 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-muted-foreground/20">
                <div className="relative flex items-start gap-4">
                   <div className="absolute -left-10 h-6 w-6 rounded-full bg-emerald-500 border-4 border-background z-10 flex items-center justify-center">
                      <CheckCircle2 className="h-3 w-3 text-white" />
                   </div>
                   <div>
                      <p className="font-black uppercase text-sm leading-tight">Order Fulfilled</p>
                      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Today at 10:45 AM</p>
                   </div>
                </div>
                <div className="relative flex items-start gap-4">
                   <div className="absolute -left-10 h-6 w-6 rounded-full bg-blue-500 border-4 border-background z-10 flex items-center justify-center">
                      <Truck className="h-3 w-3 text-white" />
                   </div>
                   <div>
                      <p className="font-black uppercase text-sm leading-tight">Dispatched from Logistics Center</p>
                      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Yesterday at 4:30 PM</p>
                   </div>
                </div>
                <div className="relative flex items-start gap-4 opacity-50">
                   <div className="absolute -left-10 h-6 w-6 rounded-full bg-muted border-4 border-background z-10"></div>
                   <div>
                      <p className="font-black uppercase text-sm leading-tight">Order Placed & Verified</p>
                      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">May 10 at 9:15 AM</p>
                   </div>
                </div>
             </div>
          </section>
        </div>

        <div className="space-y-10">
          {/* Customer Card */}
          <Card className="rounded-[2.5rem] border-none shadow-2xl shadow-black/5 overflow-hidden">
            <CardHeader className="p-8 pb-0">
              <CardTitle className="flex items-center gap-2 text-lg font-black uppercase tracking-tight">
                <User className="h-5 w-5 text-brand-gold" /> Account Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-muted/30">
                 <div className="h-12 w-12 rounded-xl bg-brand-navy flex items-center justify-center text-white font-black">
                   {order.email ? order.email[0].toUpperCase() : 'U'}
                 </div>
                 <div>
                    <p className="font-black uppercase text-sm leading-tight">{order.customerName || (order.email ? order.email.split('@')[0] : 'Guest User')}</p>
                    <p className="text-xs text-muted-foreground font-medium">{order.email}</p>
                 </div>
              </div>
              <div className="space-y-4">
                 <div className="flex items-start gap-3">
                   <MapPin className="h-4 w-4 text-brand-gold mt-1 flex-shrink-0" />
                   <p className="text-sm font-medium text-muted-foreground leading-relaxed">{order.address}</p>
                 </div>
              </div>
              <Link href={`/admin/customers/C-001`} className="w-full py-4 rounded-2xl bg-muted/50 font-black uppercase tracking-widest text-[10px] hover:bg-brand-navy hover:text-white transition-all flex items-center justify-center gap-2 group">
                 Open Full Profile <ArrowUpRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </CardContent>
          </Card>

          {/* Payment Card */}
          <Card className="rounded-[2.5rem] border-none shadow-2xl shadow-black/5 overflow-hidden">
            <CardHeader className="p-8 pb-0">
              <CardTitle className="flex items-center gap-2 text-lg font-black uppercase tracking-tight">
                <CreditCard className="h-5 w-5 text-brand-gold" /> Financial Data
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600">
                <div className="flex items-center justify-between mb-4">
                   <p className="text-[10px] font-black uppercase tracking-widest">Transaction Status</p>
                   <ShieldCheck className="h-4 w-4" />
                </div>
                <p className="text-2xl font-black tracking-tighter">€{order.total.toLocaleString()}</p>
                <p className="text-[10px] font-bold uppercase tracking-widest mt-1">Paid via {order.paymentMethod || 'Secure Card'}</p>
              </div>
              <div className="space-y-3">
                 <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Audit Information</p>
                 <div className="flex justify-between text-xs font-bold">
                    <span className="text-muted-foreground uppercase">Gateway ID</span>
                    <span>PF_GTW_9021</span>
                 </div>
                 <div className="flex justify-between text-xs font-bold">
                    <span className="text-muted-foreground uppercase">Reference</span>
                    <span className="text-brand-gold">#TRANS-88219</span>
                 </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
