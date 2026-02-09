'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { AddCardForm } from '@/components/forms/add-card-form';

// Dummy data for bank cards
const initialCards = [
  {
    id: '1',
    last4: '1234',
    brand: 'Visa',
    isDefault: true,
  },
  {
    id: '2',
    last4: '5678',
    brand: 'Mastercard',
    isDefault: false,
  },
];

export default function PaymentPage() {
  const [cards, setCards] = useState(initialCards);
  const [showAddCardForm, setShowAddCardForm] = useState(false);

  const handleAddCard = (newCardData: any) => {
    const newCard = {
      id: String(cards.length + 1),
      last4: newCardData.cardNumber.slice(-4),
      brand: 'Visa', // In a real app, you would determine the brand from the card number
      isDefault: false,
    };
    setCards([...cards, newCard]);
    setShowAddCardForm(false);
  };

  const handleRemoveCard = (cardId: string) => {
    setCards(cards.filter((card) => card.id !== cardId));
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Payment Methods</h1>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Your Cards</h2>
        <div className="space-y-4">
          {cards.map((card) => (
            <div key={card.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-semibold">{card.brand} **** {card.last4}</p>
                {card.isDefault && <span className="text-sm text-gray-500">Default</span>}
              </div>
              <Button variant="outline" size="sm" onClick={() => handleRemoveCard(card.id)}>
                <Trash2 className="mr-2 h-4 w-4" /> Remove
              </Button>
            </div>
          ))}
        </div>

        {showAddCardForm ? (
          <div className="mt-6">
            <AddCardForm 
              onSubmit={handleAddCard} 
              onCancel={() => setShowAddCardForm(false)} 
            />
          </div>
        ) : (
          <Button className="mt-6" onClick={() => setShowAddCardForm(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add New Card
          </Button>
        )}
      </div>
    </div>
  );
}
