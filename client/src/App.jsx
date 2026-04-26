import { useState } from 'react';
import axios from 'axios';
import WelcomeScreen from './components/WelcomeScreen';
import ProgressBar from './components/ProgressBar';
import SubmitScreen from './components/SubmitScreen';
import NameStep from './components/steps/NameStep';
import AvailabilityStep from './components/steps/AvailabilityStep';
import GamePreferencesStep from './components/steps/GamePreferencesStep';
import FoodStep from './components/steps/FoodStep';
import DrinksStep from './components/steps/DrinksStep';

const TOTAL_STEPS = 5;
const STEPS = [NameStep, AvailabilityStep, GamePreferencesStep, FoodStep, DrinksStep];

export default function App() {
  const [screen, setScreen] = useState('welcome');
  const [step, setStep] = useState(1);
  const [animDir, setAnimDir] = useState('forward');
  const [formData, setFormData] = useState({
    name: '',
    availability: [],
    gamePreferences: [],
    foodPreference: '',
    snacks: '',
    drinks: '',
  });
  const [submittedData, setSubmittedData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateForm = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const canProceed = () => {
    switch (step) {
      case 1: return formData.name.trim().length > 0;
      case 2: return formData.availability.length > 0;
      case 3: return formData.gamePreferences.length > 0;
      case 4: return formData.foodPreference !== '';
      case 5: return formData.drinks !== '';
      default: return false;
    }
  };

  const handleNext = async () => {
    if (!canProceed()) return;
    if (step < TOTAL_STEPS) {
      setAnimDir('forward');
      setStep((s) => s + 1);
    } else {
      setIsLoading(true);
      setError(null);
      try {
        await axios.post('/api/responses', formData);
        setSubmittedData(formData);
        setScreen('submitted');
      } catch {
        setError('Oops! Something went wrong. Give it another try 🎲');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleBack = () => {
    setAnimDir('back');
    if (step > 1) {
      setStep((s) => s - 1);
    } else {
      setScreen('welcome');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && canProceed()) handleNext();
  };

  if (screen === 'welcome') {
    return <WelcomeScreen onStart={() => setScreen('survey')} />;
  }

  if (screen === 'submitted') {
    return <SubmitScreen data={submittedData} />;
  }

  const CurrentStep = STEPS[step - 1];

  return (
    <div
      className="min-h-screen bg-game-board font-lato"
      onKeyDown={handleKeyDown}
    >
      <div className="max-w-xl mx-auto px-4 py-8 pb-16">
        {/* Header */}
        <div className="text-center mb-6 animate-fade-in">
          <p
            className="text-2xl font-black text-game-dark uppercase tracking-tight text-shadow-hard"
            style={{ transform: 'rotate(-0.5deg)', display: 'inline-block' }}
          >
            🎲 Board Game Night
          </p>
        </div>

        <ProgressBar currentStep={step} totalSteps={TOTAL_STEPS} />

        {/* Step card */}
        <div key={`step-${step}`} className="mt-6 animate-slide-in-bounce">
          <CurrentStep value={formData} onChange={updateForm} step={step - 1} />
        </div>

        {error && (
          <div
            className="mt-4 p-4 bg-game-red text-white rounded-2xl text-center font-black animate-stamp
              border-[3px] border-game-dark shadow-hard"
          >
            🚨 {error}
          </div>
        )}

        {/* Navigation */}
        <div className="mt-6 flex gap-3">
          {/* Back — retreat button */}
          <button
            onClick={handleBack}
            className="btn-game px-6 py-3.5 rounded-2xl bg-white text-game-dark font-black
              border-[3px] border-game-dark shadow-hard
              hover:-translate-y-0.5 hover:shadow-hard-lg
              active:translate-x-1 active:translate-y-1 active:shadow-none
              transition-all duration-150 uppercase tracking-wide"
            style={{ transform: 'rotate(-0.5deg)' }}
          >
            ⬅ Bail Out
          </button>

          {/* Next / Submit */}
          <button
            onClick={handleNext}
            disabled={!canProceed() || isLoading}
            style={canProceed() && !isLoading ? { transform: 'rotate(0.5deg)' } : {}}
            className={`btn-game flex-1 py-3.5 rounded-2xl font-black text-lg uppercase tracking-wide
              border-[3px] transition-all duration-150
              ${canProceed() && !isLoading
                ? step === TOTAL_STEPS
                  ? 'bg-game-red text-white border-game-dark shadow-hard-red hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#FF3366] active:translate-x-1 active:translate-y-1 active:shadow-none cursor-pointer'
                  : 'bg-game-yellow text-game-dark border-game-dark shadow-hard hover:-translate-y-0.5 hover:shadow-hard-lg active:translate-x-1 active:translate-y-1 active:shadow-none cursor-pointer'
                : 'bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed'
              }`}
          >
            {isLoading
              ? '🎲 Shuffling...'
              : step === TOTAL_STEPS
              ? 'Lock Your Move 🎯'
              : 'Roll Forward 🎲'}
          </button>
        </div>

        {/* Hint */}
        {canProceed() && (
          <p className="text-center text-xs text-gray-500 font-bold mt-3 animate-fade-in uppercase tracking-wide">
            ⌨ Press Enter to continue
          </p>
        )}
      </div>
    </div>
  );
}
