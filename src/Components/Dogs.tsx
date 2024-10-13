import { useDogsProvider } from '../providers/dogProvider';
import { useSectionProvider } from '../providers/sectionProvider';
import { Dog } from '../types';
import { DogCard } from './DogCard';

export const Dogs = () => {
  const { dogList, isLoading, handleDeleteDog, handleFavoriteDogStatus } =
    useDogsProvider();
  const { activeSection } = useSectionProvider();
  const favoritedDogs = dogList.filter((dog) => dog.isFavorite);
  const unfavoritedDogs = dogList.filter((dog) => !dog.isFavorite);

  const dogsListObject: Record<string, Dog[]> = {
    all: dogList,
    favorited: favoritedDogs,
    unfavorited: unfavoritedDogs,
  };

  return (
    <>
      {dogsListObject[activeSection].map((dog) => (
        <DogCard
          key={dog.name}
          dog={dog}
          isLoading={isLoading}
          onHeartClick={handleFavoriteDogStatus}
          onTrashIconClick={handleDeleteDog}
        />
      ))}
    </>
  );
};
