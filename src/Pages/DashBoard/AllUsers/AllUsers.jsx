import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    // Fetch all users
    const { data: users = [], isLoading } = useQuery({
        queryKey: ['all-users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        },
    });

    // Mutation to update role
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

    const handleRoleChange = (userId, newRole) => {
        updateRoleMutation.mutate({ userId, role: newRole });
    };

    return (
        <div className="overflow-x-auto p-4">
            <h2 className="text-2xl font-semibold mb-4">👥 All Users</h2>
            {isLoading ? (
                <p>Loading users...</p>
            ) : (
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user._id}>
                                <td>{index + 1}</td>
                                <td>{user.name || 'N/A'}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td className="space-x-2">
                                    {['user', 'vendor', 'admin'].map(role => (
                                        <button
                                            key={role}
                                            disabled={user.role === role}
                                            onClick={() => handleRoleChange(user._id, role)}
                                            className={`px-2 py-1 rounded text-white text-sm ${user.role === role ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                                                }`}
                                        >
                                            Make {role}
                                        </button>
                                    ))}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AllUsers;