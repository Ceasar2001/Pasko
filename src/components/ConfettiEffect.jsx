import { motion } from "framer-motion";
import { useEffect, useState } from 'react';

export function ConfettiEffect() {
  const [confetti, setConfetti] = useState([]);

  useEffect(() => {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7', '#00d2d3'];
    const pieces = [];

    for (let i = 0; i < 100; i++) {
      pieces.push({
        id: i,
        x: Math.random() * 100,
        y: -10,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        scale: 0.5 + Math.random() * 1,
      });
    }
    setConfetti(pieces);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {confetti.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute"
          style={{
            left: `${piece.x}%`,
            backgroundColor: piece.color,
            width: '10px',
            height: '10px',
            borderRadius: '2px',
          }}
          initial={{
            y: piece.y,
            rotate: 0,
            scale: piece.scale,
          }}
          animate={{
            y: ['0vh', '110vh'],
            rotate: [0, piece.rotation * 4],
            x: [0, Math.sin(piece.id) * 100],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            delay: Math.random() * 0.5,
            ease: 'easeOut',
            repeat: Infinity,
          }}
        />
      ))}
    </div>
  );
}
