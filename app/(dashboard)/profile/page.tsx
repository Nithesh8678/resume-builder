"use client"

import { Button } from "@/components/ui/Button"
import { User, Mail, Phone, MapPin, Link as LinkIcon, Github, Linkedin } from "lucide-react"

export default function Profile() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">My Profile</h1>
        <p className="text-slate-600 mt-1">Manage your personal information and preferences.</p>
      </div>

      <div className="grid gap-8">
        {/* Personal Info Section */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
            <h3 className="font-semibold text-slate-900">Personal Information</h3>
            <Button variant="outline" size="sm">Edit</Button>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <User className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Full Name</p>
                <p className="font-medium text-slate-900">Alex Morgan</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Email</p>
                <p className="font-medium text-slate-900">alex.morgan@example.com</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Phone</p>
                <p className="font-medium text-slate-900">+1 (555) 123-4567</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Location</p>
                <p className="font-medium text-slate-900">San Francisco, CA</p>
              </div>
            </div>
          </div>
        </div>

        {/* Social Links Section */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
            <h3 className="font-semibold text-slate-900">Social Links</h3>
            <Button variant="outline" size="sm">Add Link</Button>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
              <div className="flex items-center gap-3">
                <Github className="w-5 h-5 text-slate-700" />
                <span className="font-medium text-slate-900">GitHub</span>
              </div>
              <a href="#" className="text-sm text-blue-600 hover:underline">github.com/alexmorgan</a>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
              <div className="flex items-center gap-3">
                <Linkedin className="w-5 h-5 text-blue-700" />
                <span className="font-medium text-slate-900">LinkedIn</span>
              </div>
              <a href="#" className="text-sm text-blue-600 hover:underline">linkedin.com/in/alexmorgan</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
