interface Player {
  player_id: number;
  '@id': string;
  url: string;
  username: string;
  title?: string;
  followers: number;
  country: string; // API URL to country info
  last_online: number;
  joined: number;
  status: string;
  is_streamer: boolean;
  verified: boolean;
  league?: string;
  streaming_platforms: string[];
}

interface Country {
  '@id': string;
  code: string; // ISO country code (e.g. "LV")
  name: string; // Full country name (e.g. "Latvia")
}

export type { Player, Country };
