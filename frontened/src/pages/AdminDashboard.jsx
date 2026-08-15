import React, { useState } from 'react';
import { products as initialProducts } from '../data/products';
import { useToast } from '../context/ToastContext';

function AdminDashboard() {
  const [productList, setProductList] = useState(initialProducts);
  const [activeTab, setActiveTab] = useState('products');
  const { showToast } = useToast();

  // New product form state
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Electronics');
  const [image, setImage] = useState('');
  const [stock, setStock] = useState('');

  const handleDeleteProduct = (id) => {
    setProductList(prev => prev.filter(p => p.id !== id));
    showToast('Product deleted from catalog.');
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!name || !price || !image || !stock) {
      showToast('Please fill out all product fields.', 'error');
      return;
    }

    const newProd = {
      id: Date.now(),
      name,
      price: Number(price),
      originalPrice: Number(price) * 1.2,
      discount: 15,
      category,
      image,
      stock: Number(stock),
      rating: 4.8,
      reviewCount: 1,
      description: 'Newly added catalog item.'
    };

    setProductList([newProd, ...productList]);
    setName('');
    setPrice('');
    setImage('');
    setStock('');
    showToast('Product added successfully!');
    setActiveTab('products');
  };

  // KPI Calculations
  const totalRevenue = 754997;
  const totalOrdersCount = 142;

  return (
    <div style={{ fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif", color: '#1f2937', maxWidth: '1200px', margin: '0 auto' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <div>
          <h1 style={{ fontSize: '2.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Admin Dashboard</h1>
          <p style={{ color: '#6b7280', margin: '4px 0 0 0' }}>Manage store inventory, fulfillment, and business analytics.</p>
        </div>
        <span style={{ backgroundColor: '#1e293b', color: '#38bdf8', padding: '6px 14px', borderRadius: '20px', fontWeight: '700', fontSize: '0.85rem' }}>
          Role: Store Owner
        </span>
      </div>

      {/* KPI Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <span style={{ color: '#6b7280', fontSize: '0.9rem', fontWeight: '600' }}>Total Revenue</span>
          <h3 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#0f172a', margin: '6px 0 0 0' }}>₹{totalRevenue.toLocaleString('en-IN')}</h3>
        </div>
        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <span style={{ color: '#6b7280', fontSize: '0.9rem', fontWeight: '600' }}>Total Orders</span>
          <h3 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#0f172a', margin: '6px 0 0 0' }}>{totalOrdersCount}</h3>
        </div>
        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <span style={{ color: '#6b7280', fontSize: '0.9rem', fontWeight: '600' }}>Catalog Products</span>
          <h3 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#0f172a', margin: '6px 0 0 0' }}>{productList.length}</h3>
        </div>
        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <span style={{ color: '#6b7280', fontSize: '0.9rem', fontWeight: '600' }}>System Status</span>
          <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#16a34a', margin: '10px 0 0 0' }}>🟢 Operational (99.9%)</h3>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', borderBottom: '1px solid #e5e7eb', paddingBottom: '12px' }}>
        <button 
          onClick={() => setActiveTab('products')}
          style={{ padding: '10px 20px', backgroundColor: activeTab === 'products' ? '#0f172a' : 'transparent', color: activeTab === 'products' ? 'white' : '#4b5563', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}
        >
          Manage Inventory ({productList.length})
        </button>
        <button 
          onClick={() => setActiveTab('add')}
          style={{ padding: '10px 20px', backgroundColor: activeTab === 'add' ? '#0f172a' : 'transparent', color: activeTab === 'add' ? 'white' : '#4b5563', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}
        >
          + Add New Product
        </button>
      </div>

      {/* Tab 1: Product Inventory Table */}
      {activeTab === 'products' && (
        <div style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.95rem' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e5e7eb', color: '#4b5563' }}>
                  <th style={{ padding: '14px 20px' }}>Product</th>
                  <th style={{ padding: '14px 20px' }}>Category</th>
                  <th style={{ padding: '14px 20px' }}>Price</th>
                  <th style={{ padding: '14px 20px' }}>Stock</th>
                  <th style={{ padding: '14px 20px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {productList.map(item => (
                  <tr key={item.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                    <td style={{ padding: '14px 20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <img src={item.image} alt={item.name} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '6px' }} />
                      <span style={{ fontWeight: '600', color: '#0f172a' }}>{item.name}</span>
                    </td>
                    <td style={{ padding: '14px 20px', color: '#6b7280', textTransform: 'uppercase', fontSize: '0.85rem', fontWeight: '600' }}>{item.category}</td>
                    <td style={{ padding: '14px 20px', fontWeight: '700', color: '#0f172a' }}>₹{item.price.toLocaleString('en-IN')}</td>
                    <td style={{ padding: '14px 20px', color: item.stock > 10 ? '#16a34a' : '#dc2626', fontWeight: '600' }}>{item.stock} units</td>
                    <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                      <button 
                        onClick={() => handleDeleteProduct(item.id)}
                        style={{ padding: '6px 12px', backgroundColor: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: '4px', fontWeight: '600', cursor: 'pointer', fontSize: '0.85rem' }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Add Product Form */}
      {activeTab === 'add' && (
        <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px', border: '1px solid #e5e7eb', maxWidth: '600px' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#0f172a', marginBottom: '20px' }}>Add New Product to Catalog</h2>
          <form onSubmit={handleAddProduct} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.85rem', fontWeight: '600' }}>Product Name</label>
              <input type="text" required placeholder="e.g. Mechanical Gaming Keyboard" value={name} onChange={e => setName(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db', boxSizing: 'border-box' }} />
            </div>

            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.85rem', fontWeight: '600' }}>Price (₹)</label>
                <input type="number" required placeholder="4999" value={price} onChange={e => setPrice(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db', boxSizing: 'border-box' }} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.85rem', fontWeight: '600' }}>Initial Stock</label>
                <input type="number" required placeholder="25" value={stock} onChange={e => setStock(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db', boxSizing: 'border-box' }} />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.85rem', fontWeight: '600' }}>Category</label>
              <select value={category} onChange={e => setCategory(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db', backgroundColor: 'white', boxSizing: 'border-box' }}>
                <option value="Electronics">Electronics</option>
                <option value="Fashion">Fashion</option>
                <option value="Footwear">Footwear</option>
                <option value="Accessories">Accessories</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.85rem', fontWeight: '600' }}>Image URL</label>
              <input type="url" required placeholder="https://images.unsplash.com/..." value={image} onChange={e => setImage(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db', boxSizing: 'border-box' }} />
            </div>

            <button type="submit" style={{ padding: '12px', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '6px', fontWeight: '700', cursor: 'pointer', marginTop: '10px' }}>
              Publish Product
            </button>
          </form>
        </div>
      )}

    </div>
  );
}

export default AdminDashboard;