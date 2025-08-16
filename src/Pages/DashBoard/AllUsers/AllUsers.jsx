import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useState } from 'react';
import { MdPeople } from 'react-icons/md';
import Swal from 'sweetalert2';
import { FiSearch } from 'react-icons/fi';
import Loading from '../../../Components/Loader/Loading';

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const [search, setSearch] = useState('');

    const { data: users = [], isLoading } = useQuery({
        queryKey: ['all-users', search],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?search=${search}`);
            return res.data;
        },
    });

    const updateRoleMutation = useMutation({
        mutationFn: async ({ userId, role }) => {
            const res = await axiosSecure.patch(`/users/${userId}`, { role });
            return res.data;
        },
        onSuccess: () => {
            toast.success('User role updated');
            queryClient.invalidateQueries(['all-users']);
        },
        onError: () => toast.error('Failed to update role'),
    });

    const handleRoleChange = (userId, newRole, currentRole) => {
        if (newRole === currentRole) return;

        Swal.fire({
            title: `Change Role to "${newRole}"?`,
            text: "Are you sure you want to update this user's role?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#6D28D9', // Match secondary
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, change it!',
        }).then((result) => {
            if (result.isConfirmed) {
                updateRoleMutation.mutate({ userId, role: newRole });
            }
        });
    };

    return (
        <div className="max-w-6xl mx-auto p-6 bg-base-100 rounded-2xl shadow-xl">
            {/* Header */}
            <div className="flex items-center gap-2 mb-6">
                <MdPeople className="text-3xl text-secondary" />
                <h2 className="text-2xl font-bold text-secondary">All Users</h2>
            </div>

            {/* Search */}
            <div className="mb-6 flex flex-col md:flex-row items-center gap-3">
                <input
                    type="text"
                    placeholder="Search by name or email"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full md:w-1/2 input bg-base-100 border border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                />
                <button
                    type="button"
                    onClick={() => queryClient.invalidateQueries(['all-users'])}
                    className="btn flex items-center gap-2 bg-secondary text-white rounded-lg hover:bg-secondary/90 w-full md:w-auto"
                >
                    <FiSearch className="text-lg" />
                    Search
                </button>
            </div>

            {/* Loading / Empty */}
            {isLoading ? (
                <Loading />
            ) : users.length === 0 ? (
                <div className="text-center py-10 text-gray-500">
                    <p className="text-lg font-medium">😕 No users found matching your search.</p>
                    <p className="text-sm">Try adjusting the search term.</p>
                </div>
            ) : (
                <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-md">
                    <table className="table w-full">
                        <thead className="bg-secondary text-white">
                            <tr>
                                <th className="py-3 px-4 text-left">#</th>
                                <th className="py-3 px-4 text-left">Name</th>
                                <th className="py-3 px-4 text-left">Email</th>
                                <th className="py-3 px-4 text-left">Role</th>
                                <th className="py-3 px-4 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr
                                    key={user._id}
                                    className="border-t hover:bg-base-200 transition-colors"
                                >
                                    <td className="py-3 px-4">{index + 1}</td>
                                    <td className="py-3 px-4">{user.name || 'N/A'}</td>
                                    <td className="py-3 px-4">{user.email}</td>
                                    <td className="py-3 px-4 capitalize">{user.role}</td>
                                    <td className="py-3 px-4">
                                        <div className="flex flex-wrap gap-2">
                                            {['user', 'vendor', 'admin'].map((role) => (
                                                <button
                                                    key={role}
                                                    disabled={user.role === role}
                                                    onClick={() =>
                                                        handleRoleChange(user._id, role, user.role)
                                                    }
                                                    className={`btn btn-xs px-2 py-1 rounded-md ${user.role === role
                                                        ? 'btn-disabled bg-gray-300 text-gray-600 cursor-not-allowed'
                                                        : 'bg-secondary text-white hover:bg-secondary/90'
                                                        }`}
                                                >
                                                    Make {role}
                                                </button>
                                            ))}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AllUsers;