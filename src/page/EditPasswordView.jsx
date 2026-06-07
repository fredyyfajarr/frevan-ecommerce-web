import FormInput from '../components/Form/FormInput';
import customAPI from '../api';
import { toast } from 'react-toastify';
import { useNavigate, useParams, redirect } from 'react-router-dom';
import { useState } from 'react';
import Loading from '../components/Loading';

export const loader = (storage) => () => {
  const user = storage.getState().userState.user;
  if (!user) {
    toast.warn('Please login! for access this page');
    return redirect('/login');
  }
  return null;
};

const EditPasswordView = () => {
  const { id } = useParams(); // Ambil userId dari URL
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    oldPassword: '',
    newPassword: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await customAPI.put(`/auth/profile/password/${id}`, form);
      toast.success('Password updated successfully');
      navigate(`/profile/${id}`);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-xl mb-4">Change Password</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block">Old Password</label>
              <input
                type="password"
                name="oldPassword"
                className="input input-bordered w-full"
                value={form.oldPassword}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block">New Password</label>
              <input
                type="password"
                name="newPassword"
                className="input input-bordered w-full"
                value={form.newPassword}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => navigate(`/profile/${id}`)}
                className="btn btn-ghost"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? 'Updating...' : 'Update Password'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPasswordView;
