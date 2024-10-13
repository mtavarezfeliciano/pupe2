import { ReactNode } from 'react';
import { useDogsProvider } from '../providers/dogProvider';
import { useSectionProvider } from '../providers/sectionProvider';
import { ActiveTab } from '../types';

export const Section = ({
  label,
  children,
}: {
  // No more props than these two allowed
  label: string;
  children: ReactNode;
}) => {
  const { activeSection, setActiveSection } = useSectionProvider();
  const { dogList } = useDogsProvider();
  const favoritedDogsCount = dogList.filter((dog) => dog.isFavorite).length;
  const unfavoritedDogsCount = dogList.filter((dog) => !dog.isFavorite).length;

  const handleSetActiveSection = (sectionName: ActiveTab) => {
    const newActiveSection =
      sectionName !== activeSection ? sectionName : 'all';
    setActiveSection(newActiveSection);
  };

  return (
    <section id='main-section'>
      <div className='container-header'>
        <div className='container-label'>{label}</div>
        <div className='selectors'>
          {/* This should display the favorited count */}
          <div
            className={`selector ${
              activeSection === 'favorited' ? 'active' : ''
            }`}
            onClick={() => {
              // alert('click favorited');
              handleSetActiveSection('favorited');
            }}
          >
            favorited ( {favoritedDogsCount} )
          </div>

          {/* This should display the unfavorited count */}
          <div
            className={`selector ${
              activeSection === 'unfavorited' ? 'active' : ''
            }`}
            onClick={() => {
              // alert('click unfavorited');
              handleSetActiveSection('unfavorited');
            }}
          >
            unfavorited ( {unfavoritedDogsCount} )
          </div>
          <div
            className={`selector ${
              activeSection === 'createDog' ? 'active' : ''
            }`}
            onClick={() => {
              // alert('clicked create dog');
              handleSetActiveSection('createDog');
            }}
          >
            create dog
          </div>
        </div>
      </div>
      <div className='content-container'>{children}</div>
    </section>
  );
};
