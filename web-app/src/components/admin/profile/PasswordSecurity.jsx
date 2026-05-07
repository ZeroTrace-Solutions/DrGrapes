import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  KeyRound, 
  Loader2, 
  Eye, 
  EyeOff, 
  CheckCircle2,
  Lock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import PasswordChecklist from '@/components/loginPage/PasswordChecklist';

const PasswordSecurity = ({ 
  pwStep, 
  setPwStep, 
  loading, 
  oldPassword,
  setOldPassword,
  newPassword, 
  setNewPassword, 
  confirmPassword, 
  setConfirmPassword, 
  handlePasswordChange,
  showPassword, 
  setShowPassword 
}) => {
  return (
    <div className="p-8 rounded-[2rem] bg-surface-container/20 border border-outline-variant/20 backdrop-blur-sm shadow-xl">
      <h2 className="text-xl font-black uppercase tracking-tighter mb-8 flex items-center gap-3">
        <KeyRound className="size-5 text-secondary" />
        Security & Password
      </h2>

      <AnimatePresence mode="wait">
        {pwStep === 'display' && (
          <motion.div
            key="display"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col md:flex-row items-center justify-between p-6 rounded-3xl bg-surface-variant/30 border border-outline-variant/30 gap-6"
          >
            <div className="space-y-1">
              <p className="font-black uppercase tracking-tighter text-sm">Update Password</p>
              <p className="text-[10px] opacity-60 font-bold uppercase tracking-widest leading-relaxed">
                Secure your account by changing your current password.
              </p>
            </div>
            <Button 
              onClick={() => setPwStep('change')}
              disabled={loading}
              variant="outline" 
              className="rounded-2xl font-black text-[10px] uppercase tracking-widest h-12 px-8 group overflow-hidden relative"
            >
              <div className="absolute inset-0 bg-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              Change Password
            </Button>
          </motion.div>
        )}

        {pwStep === 'change' && (
          <motion.div
            key="change"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            <form onSubmit={handlePasswordChange} className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                {/* Old Password */}
                <div className="space-y-2 relative group">
                  <Label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-1">Current Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-4 opacity-40 group-focus-within:text-primary transition-colors" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      required
                      className="bg-surface-variant/30 border-outline-variant/50 h-14 pl-12 pr-12 rounded-2xl focus:ring-primary focus:border-primary transition-all"
                      placeholder="Enter current password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 opacity-20 hover:opacity-100 transition-opacity"
                    >
                      {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* New Password */}
                  <div className="space-y-2 relative group">
                    <Label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-1">New Password</Label>
                    <div className="relative">
                      <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 size-4 opacity-40 group-focus-within:text-primary transition-colors" />
                      <Input
                        type={showPassword ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        className="bg-surface-variant/30 border-outline-variant/50 h-14 pl-12 pr-12 rounded-2xl focus:ring-primary focus:border-primary transition-all"
                        placeholder="••••••••"
                      />
                    </div>
                    {/* Password Checklist */}
                    <PasswordChecklist password={newPassword} />
                  </div>

                  {/* Confirm Password */}
                  <div className="space-y-2 relative group">
                    <Label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-1">Confirm New Password</Label>
                    <div className="relative">
                      <CheckCircle2 className="absolute left-4 top-1/2 -translate-y-1/2 size-4 opacity-40 group-focus-within:text-primary transition-colors" />
                      <Input
                        type={showPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="bg-surface-variant/30 border-outline-variant/50 h-14 pl-12 rounded-2xl focus:ring-primary focus:border-primary transition-all"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button 
                  type="submit" 
                  disabled={loading}
                  className="flex-1 md:flex-none md:px-12 h-14 rounded-2xl font-black uppercase tracking-widest shadow-lg shadow-secondary/20 bg-secondary hover:bg-secondary/80 text-on-secondary"
                >
                  {loading ? <Loader2 className="size-4 animate-spin" /> : 'Update Password'}
                </Button>
                <Button 
                  type="button"
                  variant="ghost" 
                  className="h-14 rounded-2xl font-black uppercase tracking-widest opacity-40" 
                  onClick={() => setPwStep('display')}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PasswordSecurity;
