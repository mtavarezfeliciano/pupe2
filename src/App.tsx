import { CreateDogForm } from './Components/CreateDogForm';
import { Dogs } from './Components/Dogs';
import { Section } from './Components/Section';
import { DogsContextProvider } from './providers/dogProvider';
import { useSectionProvider } from './providers/sectionProvider';

export function App() {
  const { activeSection } = useSectionProvider();

  const isCreateDogView = activeSection === 'createDog';
  return (
    <div className='App' style={{ backgroundColor: 'skyblue' }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <DogsContextProvider>
        <Section
          label={
            !isCreateDogView && activeSection
              ? `Dogs: ${
                  activeSection[0].toUpperCase() +
                  activeSection.substring(1).toLowerCase()
                } Dogs`
              : ''
          }
        >
          {!isCreateDogView && <Dogs />}
          {isCreateDogView && <CreateDogForm />}
        </Section>
      </DogsContextProvider>
    </div>
  );
}
