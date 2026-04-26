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
      className="min-h-screen bg-gradient-to-br from-pastel-lav-l via-pastel-pink-l to-pastel-sky-l font-lato"
      onKeyDown={handleKeyDown}
    >
      <div className="max-w-xl mx-auto px-4 py-8 pb-16">
        {/* Header */}
        <div className="text-center mb-6 animate-fade-in">
          <p className="text-2xl font-black text-gray-700">🎲 Board Game Night</p>
        </div>

        <ProgressBar currentStep={step} totalSteps={TOTAL_STEPS} />

        {/* Step card — key forces remount on step change for animation */}
        <div key={`step-${step}`} className="mt-6 animate-slide-up">
          <CurrentStep value={formData} onChange={updateForm} />
        </div>

        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 text-red-500 rounded-2xl text-center font-medium animate-fade-in">
            {error}
          </div>
        )}

        {/* Navigation */}
        <div className="mt-6 flex gap-3">
          <button
            onClick={handleBack}
            className="px-6 py-3.5 rounded-2xl bg-white text-gray-500 font-semibold shadow-soft hover:shadow-soft-lg hover:-translate-y-0.5 active:scale-95 transition-all duration-200"
          >
            ← Back
          </button>
          <button
            onClick={handleNext}
            disabled={!canProceed() || isLoading}
            className={`flex-1 py-3.5 rounded-2xl font-bold text-white shadow-soft transition-all duration-200 ${
              canProceed() && !isLoading
                ? 'bg-gradient-to-r from-violet-400 to-fuchsia-400 hover:shadow-glow hover:-translate-y-0.5 active:scale-95 cursor-pointer'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {isLoading
              ? '🎲 Sending...'
              : step === TOTAL_STEPS
              ? "🎉 I'm In!"
              : 'Next →'}
          </button>
        </div>

        {/* Hint */}
        {canProceed() && (
          <p className="text-center text-xs text-gray-400 mt-3 animate-fade-in">
            Press Enter to continue
          </p>
        )}
      </div>
    </div>
  );
}
