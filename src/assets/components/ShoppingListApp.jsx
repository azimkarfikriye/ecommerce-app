import React, { useState } from 'react';
import { Button, Table, Card, InputGroup, Form } from 'react-bootstrap';
import { nanoid } from 'nanoid';
import styled from 'styled-components';
import { Trash3 } from 'react-bootstrap-icons';
//marketleri tanımladım.
const SHOPS = [
  { id: 1, name: 'Migros' },
  { id: 2, name: 'Teknosa' },
  { id: 3, name: 'Şok' },
  { id: 4, name: 'Bim' },
  { id: 5, name: 'File' },
  { id: 6, name: 'Macro Center' },
];
//kategorileri tanımladım burada.
const CATEGORIES = [
  { id: 1, name: 'Elektronik' },
  { id: 2, name: 'Şarküteri' },
  { id: 3, name: 'Bakım' },
  { id: 4, name: 'Oyuncak' },
  { id: 5, name: 'Bakliyat' },
  { id: 6, name: 'Unlu Mamüller' },
  { id: 7, name: 'Meyve ve Sebze' },
];

const IconButton = styled(Button)`
  border-radius: 50%;
  width: 36px;
  height: 36px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 0;

  &:hover {
    background-color: rgba(220, 53, 69, 0.2);
    border-color: #dc3545;
  }

  &:active {
    background-color: rgba(220, 53, 69, 0.3);
    border-color: #dc3545;
  }
`;

const ShoppingListApp = () => {
  const [products, setProducts] = useState([]);
  const [newProductName, setNewProductName] = useState('');
  const [newProductShop, setNewProductShop] = useState(undefined);
  const [newProductCategory, setNewProductCategory] = useState(undefined);

  const handleAddProduct = () => {
    if (!newProductName.trim() || !newProductShop || !newProductCategory) {
      alert('Lütfen ürün adı, market ve kategori seçiniz...');
      return;
    }

    const newProduct = {
      id: nanoid(),
      name: newProductName,
      shop: newProductShop,
      category: newProductCategory,
      isBought: false,
    };
    setProducts((prev) => [...prev, newProduct]);
    setNewProductName('');
    setNewProductShop(undefined);
    setNewProductCategory(undefined);
  };

  const handleProductClick = (id) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isBought: !p.isBought } : p))
    );
  };

  const handleDeleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Alışverişte Alınacaklar Listem</h1>

      <Card className="mb-4">
        <Card.Body>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Ürün Adı"
              value={newProductName}
              onChange={(e) => setNewProductName(e.target.value)}
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <Form.Select
              value={newProductShop === undefined ? '' : newProductShop}
              onChange={(e) => setNewProductShop(Number(e.target.value))}
            >
              <option value="">Market Seçin</option>
              {SHOPS.map((shop) => (
                <option key={shop.id} value={shop.id}>
                  {shop.name}
                </option>
              ))}
            </Form.Select>
          </InputGroup>

          <InputGroup className="mb-3">
            <Form.Select
              value={newProductCategory === undefined ? '' : newProductCategory}
              onChange={(e) => setNewProductCategory(Number(e.target.value))}
            >
              <option value="">Kategori Seçin</option>
              {CATEGORIES.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Form.Select>
          </InputGroup>

          <Button onClick={handleAddProduct} className="w-100">Ürün Ekle</Button>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Ürün Adı</th>
                <th>Market</th>
                <th>Kategori</th>
                <th>Durum</th>
                <th>Sil</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  key={product.id}
                  onClick={() => handleProductClick(product.id)}
                  style={{
                    cursor: 'pointer',
                    textDecoration: product.isBought ? 'line-through' : 'none',
                    backgroundColor: product.isBought
                      ? 'rgba(119, 255, 0, 0.1)'
                      : 'transparent',
                  }}
                >
                  <td>{product.name}</td>
                  <td>{SHOPS.find((s) => s.id === product.shop)?.name}</td>
                  <td>{CATEGORIES.find((c) => c.id === product.category)?.name}</td>
                  <td>{product.isBought ? 'Satın Alındı' : 'Alınacak'}</td>
                  <td>
                    <IconButton
                      variant="danger"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteProduct(product.id);
                      }}
                    >
                      <Trash3 />
                    </IconButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ShoppingListApp;



