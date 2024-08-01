interface User {
  id: string;
  name: string;
  email: string;
  role: string | null;
  profile_image: string;
  created_at: string;
}

export type { User };
