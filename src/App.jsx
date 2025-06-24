import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Copy, Users, Wallet, Gift } from 'lucide-react';
import Lottie from 'lottie-react';
import wheelAnimation from './animations/wheel.json';
import tg from '@twa-dev/sdk';

export default function App() {
  const [balance, setBalance] = useState(320);
  const [referrals, setReferrals] = useState([
    { id: 1, name: "@user1" },
    { id: 2, name: "@user2" },
  ]);
  const [transactions, setTransactions] = useState([
    { type: "Пополнение", amount: 100, time: "10:00" },
    { type: "Ставка", amount: -20, time: "10:15" },
  ]);
  const [stake, setStake] = useState('');
  const [spinning, setSpinning] = useState(false);
  const [lastResult, setLastResult] = useState(null);

  const handleSpin = () => {
    if (!stake || isNaN(stake)) return;
    setSpinning(true);
    setTimeout(() => {
      const result = Math.random() < 0.5 ? 0 : parseInt(stake) * 2;
      setBalance(prev => prev + result - parseInt(stake));
      setTransactions(prev => [
        { type: "Ставка", amount: -parseInt(stake), time: new Date().toLocaleTimeString() },
        ...(result > 0 ? [{ type: "Выигрыш", amount: result, time: new Date().toLocaleTimeString() }] : []),
        ...prev
      ]);
      setLastResult(result);
      setSpinning(false);
    }, 3000);
  };

  const copyReferral = () => {
    navigator.clipboard.writeText("t.me/app?start=ref123");
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <Tabs defaultValue="main">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="main"><Gift className="w-4 h-4 inline" /> Игра</TabsTrigger>
          <TabsTrigger value="wallet"><Wallet className="w-4 h-4 inline" /> Кошелёк</TabsTrigger>
          <TabsTrigger value="ref"><Users className="w-4 h-4 inline" /> Рефералы</TabsTrigger>
        </TabsList>

        {/* Главный экран */}
        <TabsContent value="main">
          <Card>
            <CardContent className="flex flex-col items-center p-4 space-y-4">
              <div className="w-40 h-40 flex items-center justify-center">
                {spinning ? (
                  <Lottie animationData={wheelAnimation} loop />
                ) : (
                  <div className="w-40 h-40 bg-gradient-to-r from-purple-400 to-blue-500 rounded-full flex items-center justify-center">
                    <Button onClick={handleSpin}>Старт</Button>
                  </div>
                )}
              </div>
              {lastResult !== null && (
                <div className="text-center text-lg font-semibold">
                  Результат: {lastResult === 0 ? 'Ничего :(' : `+${lastResult} монет`}
                </div>
              )}
              <div className="w-full">
                <Input placeholder="Введите ставку" value={stake} onChange={(e) => setStake(e.target.value)} />
                <Button className="w-full mt-2" onClick={handleSpin} disabled={spinning}>Участвовать</Button>
              </div>
              <div className="w-full mt-4">
                <h4 className="text-sm font-semibold mb-1">Участники:</h4>
                <div className="space-y-2">
                  <div className="flex justify-between"><span>@alice</span><span>10</span></div>
                  <div className="flex justify-between"><span>@bob</span><span>20</span></div>
                </div>
              </div>
              <a href="https://t.me/yourchannel" className="text-blue-500 underline mt-4">Перейти в канал</a>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Кошелёк */}
        <TabsContent value="wallet">
          <Card>
            <CardContent className="p-4 space-y-4">
              <h2 className="text-xl font-bold">Баланс: {balance} монет</h2>
              <div className="flex gap-2">
                <Button onClick={() => setBalance(b => b + 100)}>Пополнить</Button>
                <Button variant="outline" onClick={() => setBalance(b => Math.max(b - 50, 0))}>Вывести</Button>
              </div>
              <div className="mt-4">
                <h4 className="text-sm font-semibold mb-2">История:</h4>
                {transactions.map((t, i) => (
                  <div key={i} className="flex justify-between text-sm border-b py-1">
                    <span>{t.type}</span>
                    <span className={t.amount > 0 ? 'text-green-500' : 'text-red-500'}>
                      {t.amount > 0 ? '+' : ''}{t.amount}
                    </span>
                    <span className="text-gray-500">{t.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Рефералы */}
        <TabsContent value="ref">
          <Card>
            <CardContent className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Ваша реф. ссылка</p>
                  <p className="font-mono text-sm">t.me/app?start=ref123</p>
                </div>
                <Button variant="ghost" size="icon" onClick={copyReferral}><Copy className="w-4 h-4" /></Button>
              </div>
              <p>Вы пригласили: {referrals.length} человек</p>
              <div className="space-y-2">
                {referrals.map((r) => (
                  <div key={r.id} className="text-sm">{r.name}</div>
                ))}
              </div>
              <p className="font-bold">Начислено бонусов: {referrals.length * 50}</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
