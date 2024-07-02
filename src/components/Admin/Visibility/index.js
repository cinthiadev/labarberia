import './visibility.css';
import { useState, useEffect } from 'react';

const Visibility = () => {
  const [visibilityState, setVisibilityState] = useState({
    header: true,
    aboutUs: true,
    ourLocation: true,
    ourServices: true,
    team: true,
    gallery: true,
    footer: true,
  });

  useEffect(() => {
    const storedVisibility = JSON.parse(localStorage.getItem('visibilityState'));
    if (storedVisibility) {
      setVisibilityState(storedVisibility);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('visibilityState', JSON.stringify(visibilityState));
  }, [visibilityState]);

  const handleToggle = (section) => {
    const newState = { ...visibilityState, [section]: !visibilityState[section] };
    setVisibilityState(newState);
  };

  return (
    <div className='container'>
      <section className="section-admin edit-visibility" id="edit-visibility">
        <h2>Order & Visibility</h2>
        {Object.keys(visibilityState).map((section) => (
          <div className="visibility" key={section}>
            <p>{section.charAt(0).toUpperCase() + section.slice(1)}</p>
            <div className="toggle-switch">
              <input
                type="checkbox"
                className="toggle-checkbox"
                id={`toggle-${section}`}
                checked={visibilityState[section]}
                onChange={() => handleToggle(section)}
              />
              <label className={`toggle-label ${visibilityState[section] ? 'toggle-label-on' : ''}`} htmlFor={`toggle-${section}`}>
                <div className={`toggle-inner ${visibilityState[section] ? 'toggle-on' : ''}`} />
              </label>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Visibility;