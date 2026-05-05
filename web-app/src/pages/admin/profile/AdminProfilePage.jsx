import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

// Refactored Components
import ProfileHeader from '@/components/admin/profile/ProfileHeader';
import PersonalInfoForm from '@/components/admin/profile/PersonalInfoForm';
import PasswordSecurity from '@/components/admin/profile/PasswordSecurity';
import ProfileStats from '@/components/admin/profile/ProfileStats';
import RecentLogs from '@/components/admin/profile/RecentLogs';

// Validation
import { validatePassword, validateConfirmPassword } from '@shared/utils/validation';

const AdminProfilePage = () => {
  const { user, logout, changePassword } = useAuth();
  
  // Profile Data States
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullname: user?.fullname || 'ZeroTrace Solutions',
    username: user?.username || 'zt_admin',
    email: user?.email || 'admin@ztsolutions.tech',
    role: user?.role || 'ADMIN',
    level: user?.level || 'MEMBERSHIP',
    gender: user?.gender || 'MALE',
    DateOfBirth: user?.DateOfBirth || '1998-01-01T00:00:00.000Z'
  });

  // Change Password States: 'display', 'change'
  const [pwStep, setPwStep] = useState('display');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleUpdate = (e) => {
    e.preventDefault();
    toast.success('Profile updated successfully (Simulation)');
    setIsEditing(false);
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    
    // 1. Validate New Password Strength
    const passwordVal = validatePassword(newPassword);
    if (!passwordVal.isValid) {
      toast.error(passwordVal.message);
      return;
    }

    // 2. Validate Match
    const confirmVal = validateConfirmPassword(newPassword, confirmPassword);
    if (!confirmVal.isValid) {
      toast.error(confirmVal.message);
      return;
    }
    
    setLoading(true);
    const { error } = await changePassword(oldPassword, newPassword);
    
    if (!error) {
      toast.success('Password updated successfully');
      setPwStep('display');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } else {
      toast.error(error);
    }
    setLoading(false);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="relative min-h-screen pb-20 overflow-x-hidden">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full space-y-8 px-4 md:px-8 lg:px-12"
      >
        <ProfileHeader 
          formData={formData}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          logout={logout}
          user={user}
          itemVariants={itemVariants}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
            <PersonalInfoForm 
              formData={formData}
              setFormData={setFormData}
              isEditing={isEditing}
              handleUpdate={handleUpdate}
            />

            <PasswordSecurity 
              pwStep={pwStep}
              setPwStep={setPwStep}
              loading={loading}
              oldPassword={oldPassword}
              setOldPassword={setOldPassword}
              newPassword={newPassword}
              setNewPassword={setNewPassword}
              confirmPassword={confirmPassword}
              setConfirmPassword={setConfirmPassword}
              handlePasswordChange={handlePasswordChange}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
            />
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-8">
            <ProfileStats formData={formData} />
            <RecentLogs />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminProfilePage;