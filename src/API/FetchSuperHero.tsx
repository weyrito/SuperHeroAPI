const API_KEY = '0597e5020c723ff436cb3b8bb7bf6935';
const BASE_URL = `https://superheroapi.com/api.php/${API_KEY}`;

export const searchHeroes = async (name: string) => {
  try {
    // Don't search if name is empty
    if (!name.trim()) {
      return [];
    }

    // Using api.allorigins.win as alternative CORS proxy
    const encodedUrl = encodeURIComponent(`${BASE_URL}/search/${name}`);
    const proxyUrl = `https://api.allorigins.win/raw?url=${encodedUrl}`;
    console.log('Full URL:', proxyUrl);
    
    const response = await fetch(proxyUrl);
    console.log('Response status:', response.status);
    
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('API response:', data);
    
    if (data.response === 'success') {
      return data.results || [];
    } else {
      console.error('API Error:', data.error);
      return [];
    }
  } catch (error) {
    console.error('Error fetching heroes:', error);
    return [];
  }
};

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getHeroById = async (id: string) => {
  try {
    const encodedUrl = encodeURIComponent(`${BASE_URL}/${id}`);
    const proxyUrl = `https://api.allorigins.win/raw?url=${encodedUrl}`;
    
    let retries = 3;
    while (retries > 0) {
      try {
        const response = await fetch(proxyUrl);
        if (response.status === 429) {
          await delay(6000);
          retries--;
          continue;
        }
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        const data = await response.json();
        return data.response === 'success' || data.id ? data : null;
      } catch (error) {
        retries--;
        if (retries === 0) throw error;
        await delay(1000);
      }
    }
    return null;
  } catch (error) {
    console.error('Error fetching hero details:', error);
    return null;
  }
};

export const getAllHeroes = async () => {
  try {
    // Fetch first 10 heroes by ID (1-10)
    const heroes = await Promise.all(
      Array.from({ length: 10 }, (_, i) => getHeroById((i + 1).toString()))
    );
    return heroes.filter((hero): hero is Hero => hero !== null);
  } catch (error) {
    console.error('Error fetching all heroes:', error);
    return [];
  }
};

export interface Hero {
  id: string;
  name: string;
  powerstats: {
    intelligence: string;
    strength: string;
    speed: string;
    durability: string;
    power: string;
    combat: string;
  };
  biography: {
    'full-name': string;
    'alter-egos': string;
    aliases: string[];
    'place-of-birth': string;
    'first-appearance': string;
    publisher: string;
    alignment: string;
  };
  appearance: {
    gender: string;
    race: string;
    height: string[];
    weight: string[];
    'eye-color': string;
    'hair-color': string;
  };
  image: {
    url: string;
  };
}