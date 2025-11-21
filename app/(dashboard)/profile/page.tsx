"use client"

import { Button } from "@/components/ui/Button"
import { User, Mail, Phone, MapPin, Link as LinkIcon, Github, Linkedin, Loader2, Globe } from "lucide-react"
import { useEffect, useState } from "react"
import { fetchProfile } from "@/lib/actions"
import { ProfileEditModal } from "@/components/dashboard/ProfileEditModal"

export default function Profile() {
  const [profile, setProfile] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  const loadProfile = async () => {
    try {
      const data = await fetchProfile()
      setProfile(data)
    } catch (error) {
      console.error("Error loading profile:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadProfile()
  }, [])

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    )
  }

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
            <Button variant="outline" size="sm" onClick={() => setIsEditModalOpen(true)}>Edit</Button>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <User className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Full Name</p>
                <p className="font-medium text-slate-900">{profile?.full_name || "Not set"}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Email</p>
                <p className="font-medium text-slate-900">{profile?.email || "Not set"}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Phone</p>
                <p className="font-medium text-slate-900">{profile?.phone || "Not set"}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Location</p>
                <p className="font-medium text-slate-900">{profile?.location || "Not set"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Social Links Section */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
            <h3 className="font-semibold text-slate-900">Social Links</h3>
            <Button variant="outline" size="sm" onClick={() => setIsEditModalOpen(true)}>Edit</Button>
          </div>
          <div className="p-6 space-y-4">
            {profile?.github_url && (
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                <div className="flex items-center gap-3">
                  <Github className="w-5 h-5 text-slate-700" />
                  <span className="font-medium text-slate-900">GitHub</span>
                </div>
                <a href={profile.github_url} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline truncate max-w-[200px]">
                  {profile.github_url}
                </a>
              </div>
            )}
            {profile?.linkedin_url && (
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                <div className="flex items-center gap-3">
                  <Linkedin className="w-5 h-5 text-blue-700" />
                  <span className="font-medium text-slate-900">LinkedIn</span>
                </div>
                <a href={profile.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline truncate max-w-[200px]">
                  {profile.linkedin_url}
                </a>
              </div>
            )}
            {profile?.website_url && (
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-emerald-600" />
                  <span className="font-medium text-slate-900">Website</span>
                </div>
                <a href={profile.website_url} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline truncate max-w-[200px]">
                  {profile.website_url}
                </a>
              </div>
            )}
            {!profile?.github_url && !profile?.linkedin_url && !profile?.website_url && (
              <div className="text-center py-6 text-slate-500">
                No social links added yet.
              </div>
            )}
          </div>
        </div>
      </div>

      <ProfileEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        initialData={profile}
        onSuccess={loadProfile}
      />
    </div>
  );
}
