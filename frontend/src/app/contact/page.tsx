'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail, Instagram, MessageCircle, Send, CheckCircle2 } from 'lucide-react';
import { BRAND_INFO } from '@/lib/constants';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 600);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs uppercase tracking-widest text-gold-700 font-bold">Connect With Us</span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-maroon-900">
          Contact Madhu Silks
        </h1>
        <p className="text-xs sm:text-sm text-darkbrown/70 leading-relaxed">
          Have an enquiry about a specific saree weave, wedding bulk order, or custom video consultation? We are here to assist you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Contact Info Card & Direct Action Buttons */}
        <div className="space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-cream space-y-6 shadow-sm">
            <h2 className="font-serif font-bold text-xl text-maroon-950 border-b border-cream pb-3">
              Shop Information
            </h2>

            <div className="space-y-5 text-xs sm:text-sm">
              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-maroon-50 text-maroon-800 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-gold-600" />
                </div>
                <div>
                  <h3 className="font-bold text-darkbrown text-xs uppercase tracking-wider">Boutique Address</h3>
                  <p className="text-darkbrown/80 mt-1 leading-relaxed">
                    {BRAND_INFO.address}
                  </p>
                  <p className="text-[11px] text-darkbrown/50 mt-0.5">Jakribettu, Bantwal Taluk, Dakshina Kannada, Karnataka</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-maroon-50 text-maroon-800 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-gold-600" />
                </div>
                <div>
                  <h3 className="font-bold text-darkbrown text-xs uppercase tracking-wider">Phone Call</h3>
                  <a
                    href={`tel:${BRAND_INFO.phone}`}
                    className="text-maroon-800 font-semibold hover:underline block mt-1"
                  >
                    {BRAND_INFO.phoneFormatted}
                  </a>
                  <p className="text-[11px] text-darkbrown/50">Available 9:30 AM – 8:00 PM IST (Mon–Sat)</p>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-darkbrown text-xs uppercase tracking-wider">WhatsApp Ordering & Enquiry</h3>
                  <a
                    href={`https://wa.me/91${BRAND_INFO.whatsapp}?text=${encodeURIComponent('Hello Madhu Silks! I have an inquiry about your saree collection.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-700 font-semibold hover:underline block mt-1"
                  >
                    {BRAND_INFO.whatsappFormatted}
                  </a>
                  <p className="text-[11px] text-darkbrown/50">Instant message &amp; video call draping previews</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-maroon-50 text-maroon-800 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-gold-600" />
                </div>
                <div>
                  <h3 className="font-bold text-darkbrown text-xs uppercase tracking-wider">Email</h3>
                  <a
                    href={`mailto:${BRAND_INFO.email}`}
                    className="text-maroon-800 font-semibold hover:underline block mt-1"
                  >
                    {BRAND_INFO.email}
                  </a>
                  <p className="text-[11px] text-darkbrown/50">For bulk orders, institutional gifting & support</p>
                </div>
              </div>

              {/* Instagram */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-maroon-50 text-maroon-800 flex items-center justify-center shrink-0">
                  <Instagram className="w-5 h-5 text-gold-600" />
                </div>
                <div>
                  <h3 className="font-bold text-darkbrown text-xs uppercase tracking-wider">Instagram</h3>
                  <a
                    href={BRAND_INFO.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-maroon-800 font-semibold hover:underline block mt-1"
                  >
                    {BRAND_INFO.instagramHandle}
                  </a>
                  <p className="text-[11px] text-darkbrown/50">Daily updates on new arrivals & festive reels</p>
                </div>
              </div>
            </div>
          </div>

          {/* Verified Google Maps Embed / Card */}
          <div className="bg-white p-4 rounded-2xl border border-cream shadow-sm space-y-3">
            <h3 className="font-serif font-bold text-sm text-maroon-950 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-gold-600" />
              <span>Location: Jakribettu, Bantwal</span>
            </h3>
            <div className="aspect-[16/9] w-full rounded-xl overflow-hidden bg-cream relative">
              <iframe
                title="Madhu Silks Jakribettu Bantwal Location"
                src="https://maps.google.com/maps?q=Jakribettu,+Bantwal,+Karnataka&t=&z=14&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-cream shadow-sm space-y-6">
          <div className="space-y-1">
            <h2 className="font-serif font-bold text-xl text-maroon-950">Send an Enquiry</h2>
            <p className="text-xs text-darkbrown/70">Fill out this form and our store team will respond within 24 hours.</p>
          </div>

          {isSubmitted ? (
            <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h3 className="font-serif font-bold text-base text-emerald-900">Message Received!</h3>
              <p className="text-xs text-emerald-800 max-w-sm mx-auto leading-relaxed">
                Thank you for contacting Madhu Silks. Our Jakribettu team will reach out to you shortly via phone or email.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="mt-2 px-4 py-2 bg-emerald-700 text-white rounded-lg text-xs font-semibold"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-darkbrown">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Meera Pai"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-cream rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-gold-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-darkbrown">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="yourname@gmail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 border border-cream rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-gold-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-darkbrown">Phone / WhatsApp Number</label>
                  <input
                    type="tel"
                    placeholder="10-digit mobile number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-cream rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-gold-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-darkbrown">Subject / Inquiry Type *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Bridal Saree Availability / Custom Order"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-3 py-2 border border-cream rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-gold-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-darkbrown">Message Details *</label>
                <textarea
                  required
                  rows={5}
                  placeholder="Tell us what you are looking for..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3 py-2 border border-cream rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-gold-500"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl bg-maroon-800 hover:bg-maroon-900 active:scale-98 text-ivory font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSubmitting ? 'Sending Enquiry...' : 'Submit Message'}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

