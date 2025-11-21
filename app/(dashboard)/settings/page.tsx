"use client"

import { Button } from "@/components/ui/Button"
import { Bell, Lock, CreditCard, Monitor, Moon } from "lucide-react"

export default function Settings() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
        <p className="text-slate-600 mt-1">Manage your account settings and preferences.</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm divide-y divide-slate-100">
        {/* Account Section */}
        <div className="p-6">
          <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <Lock className="w-5 h-5 text-slate-400" />
            Account Security
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-slate-900">Password</p>
                <p className="text-sm text-slate-500">Last changed 3 months ago</p>
              </div>
              <Button variant="outline" size="sm">Change Password</Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-slate-900">Two-Factor Authentication</p>
                <p className="text-sm text-slate-500">Add an extra layer of security</p>
              </div>
              <Button variant="outline" size="sm">Enable</Button>
            </div>
          </div>
        </div>

        {/* Subscription Section */}
        <div className="p-6">
          <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-slate-400" />
            Subscription
          </h3>
          <div className="flex items-center justify-between bg-blue-50 p-4 rounded-lg border border-blue-100">
            <div>
              <p className="font-medium text-blue-900">Free Plan</p>
              <p className="text-sm text-blue-700">You are currently on the free plan</p>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">Upgrade to Pro</Button>
          </div>
        </div>

        {/* Appearance Section */}
        <div className="p-6">
          <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <Monitor className="w-5 h-5 text-slate-400" />
            Appearance
          </h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-slate-900">Theme</p>
              <p className="text-sm text-slate-500">Customize how ResumeAI looks</p>
            </div>
            <div className="flex gap-2">
              <button className="p-2 rounded-lg bg-slate-100 border border-slate-200 text-slate-900">
                <Monitor className="w-5 h-5" />
              </button>
              <button className="p-2 rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50">
                <Moon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Notifications Section */}
        <div className="p-6">
          <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <Bell className="w-5 h-5 text-slate-400" />
            Notifications
          </h3>
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500" defaultChecked />
              <span className="text-slate-700">Email me about product updates</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500" defaultChecked />
              <span className="text-slate-700">Email me about job opportunities</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
