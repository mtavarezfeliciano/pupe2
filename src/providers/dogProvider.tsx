import {
  useContext,
  ReactNode,
  createContext,
  useState,
  useEffect,
} from 'react';
import { Dog } from '../types';
import { Requests } from '../api';
import toast from 'react-hot-toast';

type TDogContextProviderProps = {
  children?: ReactNode;
};

type TDogContext = {
  dogList: Dog[];
  isLoading: boolean;
  handleFavoriteDogStatus: (id: number, isFavorite: boolean) => Promise<void>;
  handleDeleteDog: (id: number) => Promise<void>;
  handleAddDog: (dog: Omit<Dog, 'id'>) => Promise<void>;
};

const { getAllDogs, patchFavoriteForDog, postDog, deleteDogRequest } = Requests;
const DogsContext = createContext({} as TDogContext);

export const DogsContextProvider = ({ children }: TDogContextProviderProps) => {
  const [dogList, setDogList] = useState<Dog[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchDogsList = () => {
    return getAllDogs().then(setDogList);
  };

  useEffect(() => {
    void fetchDogsList();
  }, []);

  const handleFavoriteDogStatus = (id: number, isFavorite: boolean) => {
    setDogList(
      dogList.map((dog) => (dog.id === id ? { ...dog, isFavorite } : dog))
    );
    return patchFavoriteForDog(id, isFavorite)
      .then(() => {
        toast.success('Updated the dog successfully');
        return;
      })
      .catch(() => {
        setDogList(dogList);
        toast.error('Updating the dog failed');
      });
  };

  const handleDeleteDog = (id: number) => {
    setDogList(dogList.filter((dog) => dog.id !== id));
    return deleteDogRequest(id)
      .then(() => {
        toast.success('The dog was successfully deleted');
        return;
      })
      .catch(() => {
        setDogList(dogList);
        toast.error('Deleting the dog failed');
      });
  };

  const handleAddDog = (dog: Omit<Dog, 'id'>) => {
    setIsLoading(true);
    return postDog(dog)
      .then(() => fetchDogsList())
      .then(() => {
        toast.success('The dog was added successfully');
        return;
      })
      .catch(() => {
        toast.error('Failed to add the dog');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <DogsContext.Provider
      value={{
        dogList,
        isLoading,
        handleFavoriteDogStatus,
        handleDeleteDog,
        handleAddDog,
      }}
    >
      {children}
    </DogsContext.Provider>
  );
};

export const useDogsProvider = () => useContext(DogsContext);
