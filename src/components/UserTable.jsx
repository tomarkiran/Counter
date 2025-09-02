import React, { useEffect, useState } from "react"

const UserTable= () => {
  const [users, setUsers] = useState([])
  const [search, setSearch] = useState("")
  const [viewUser, setViewUser] = useState(null)
  const [editUser, setEditUser] = useState(null)

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then(data => setUsers(data))
  }, [])

  const deleteUser = (id) => {
    setUsers(users.filter(u => u.id !== id))
  }

  const saveEdit = () => {
    setUsers(users.map(u => u.id === editUser.id ? editUser : u))
    setEditUser(null)
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4 font-bold">Users Table</h2>

      <input 
        type="text" 
        placeholder="Search..." 
        value={search} 
        onChange={e => setSearch(e.target.value)} 
        className="border p-2 mb-4 w-full rounded"
      />

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            (u.name.toLowerCase().includes(search.toLowerCase()) || 
             u.email.toLowerCase().includes(search.toLowerCase())) && (
              <tr key={u.id} className="text-center">
                <td className="border p-2">{u.id}</td>
                <td className="border p-2">{u.name}</td>
                <td className="border p-2">{u.email}</td>
                <td className="border p-2 space-x-2">
                  <button onClick={() => setViewUser(u)} className="bg-green-500 text-white px-2 py-1 rounded">View</button>
                  <button onClick={() => setEditUser(u)} className="bg-blue-500 text-white px-2 py-1 rounded">Edit</button>
                  <button onClick={() => deleteUser(u.id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                </td>
              </tr>
            )
          ))}
        </tbody>
      </table>

      {viewUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded w-80">
            <h3 className="font-bold mb-2">User Info</h3>
            <p><b>ID:</b> {viewUser.id}</p>
            <p><b>Name:</b> {viewUser.name}</p>
            <p><b>Email:</b> {viewUser.email}</p>
            <button onClick={() => setViewUser(null)} className="mt-4 bg-gray-500 text-white px-4 py-2 rounded">Close</button>
          </div>
        </div>
      )}

      {editUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded w-80">
            <h3 className="font-bold mb-2">Edit User</h3>
            <input 
              type="text" 
              value={editUser.name} 
              onChange={e => setEditUser({...editUser, name: e.target.value})} 
              className="border p-2 mb-2 w-full rounded"
            />
            <input 
              type="email" 
              value={editUser.email} 
              onChange={e => setEditUser({...editUser, email: e.target.value})} 
              className="border p-2 mb-2 w-full rounded"
            />
            <button onClick={saveEdit} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Save</button>
            <button onClick={() => setEditUser(null)} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserTable
