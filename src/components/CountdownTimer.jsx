import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Card } from './ui/card';
import { ConfettiEffect } from './ConfettiEffect';

export function CountdownTimer({ onEventChange }) {
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalSeconds: 0,
  });
  const [currentEvent, setCurrentEvent] = useState('christmas');
  const [showCelebration, setShowCelebration] = useState(false);
  const [isNearTarget, setIsNearTarget] = useState(false);

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date();
      const currentYear = now.getFullYear();
      
      // Determine target date
      const christmas = new Date(currentYear, 11, 25, 0, 0, 0); // December 25
      const newYear = new Date(currentYear + 1, 0, 1, 0, 0, 0); // January 1 next year
      
      let targetDate;
      let eventType;
      
      // If we're past Christmas this year, count to New Year
      if (now > christmas) {
        targetDate = newYear;
        eventType = 'newyear';
      } else {
        targetDate = christmas;
        eventType = 'christmas';
      }
      
      // Update event type if changed
      if (eventType !== currentEvent) {
        setCurrentEvent(eventType);
        onEventChange?.(eventType);
      }
      
      const difference = targetDate.getTime() - now.getTime();
      
      // Check if we hit zero
      if (difference <= 0) {
        setShowCelebration(true);
        setTimeout(() => setShowCelebration(false), 5000);
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          totalSeconds: 0,
        };
      }
      
      // Check if within 20 seconds
      const totalSeconds = Math.floor(difference / 1000);
      setIsNearTarget(totalSeconds <= 20);
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      return { days, hours, minutes, seconds, totalSeconds };
    };
    
    const timer = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);
    
    setTimeRemaining(calculateTimeRemaining());
    
    return () => clearInterval(timer);
  }, [currentEvent, onEventChange]);

  const getEventTitle = () => {
    return currentEvent === 'christmas' ? '🎄 Christmas Countdown' : '🎆 New Year Countdown';
  };

  const getEventEmoji = () => {
    return currentEvent === 'christmas' ? '🎄' : '🎆';
  };

  const getCelebrationMessage = () => {
    return currentEvent === 'christmas' 
      ? '🎄 Merry Christmas! 🎄' 
      : '🎆 Happy New Year! 🎆';
  };

  return (
    <div className="relative">
      <AnimatePresence>
        {showCelebration && <ConfettiEffect />}
      </AnimatePresence>
      
      <motion.div
        animate={isNearTarget ? {
          scale: [1, 1.02, 1],
        } : {}}
        transition={{
          duration: 0.5,
          repeat: isNearTarget ? Infinity : 0,
        }}
      >
        <Card 
          className={`p-8 md:p-12 rounded-3xl shadow-2xl backdrop-blur-sm transition-all duration-300 ${
            isNearTarget 
              ? 'bg-gradient-to-br from-red-600/90 via-green-600/90 to-red-600/90 animate-pulse' 
              : 'bg-gradient-to-br from-red-700/80 via-green-700/80 to-red-700/80'
          }`}
        >
          <motion.h1 
            className="text-center mb-8 text-white"
            animate={isNearTarget ? {
              scale: [1, 1.1, 1],
              rotate: [0, 2, -2, 0],
            } : {}}
            transition={{
              duration: 0.6,
              repeat: isNearTarget ? Infinity : 0,
            }}
          >
            {getEventTitle()}
          </motion.h1>
          
          {showCelebration ? (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              className="text-center py-12"
            >
              <p className="text-white text-5xl md:text-7xl">
                {getCelebrationMessage()}
              </p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {[
                { label: 'Days', value: timeRemaining.days },
                { label: 'Hours', value: timeRemaining.hours },
                { label: 'Minutes', value: timeRemaining.minutes },
                { label: 'Seconds', value: timeRemaining.seconds },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <Card className="bg-white/95 p-4 md:p-6 rounded-2xl shadow-lg">
                    <motion.div
                      key={item.value}
                      initial={{ scale: 1.2, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className={`text-4xl md:text-6xl mb-2 ${
                        currentEvent === 'christmas' 
                          ? 'text-red-600' 
                          : 'text-blue-600'
                      }`}
                    >
                      {item.value.toString().padStart(2, '0')}
                    </motion.div>
                    <div className="text-gray-600 uppercase tracking-wide text-sm">
                      {item.label}
                    </div>
                  </Card>
                  {/* Test Celebration Button (for development only) */}
{/* <div className="text-center mt-6">
  <button
    onClick={() => setShowCelebration(true)}
    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-md transition-all duration-200"
  >
    🎉 Test Celebration
  </button>
</div> */}

                </motion.div>
              ))}
            </div>
          )}
          
          {isNearTarget && !showCelebration && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center mt-6"
            >
              <p className="text-white text-2xl md:text-3xl animate-pulse">
                {getEventEmoji()} Almost there! {getEventEmoji()}
              </p>
            </motion.div>
          )}
        </Card>
      </motion.div>
    </div>
  );
}
