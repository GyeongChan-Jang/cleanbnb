export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      applications: {
        Row: {
          application_id: string
          cleaner_id: string
          created_at: string
          job_id: string
          status: string
        }
        Insert: {
          application_id?: string
          cleaner_id?: string
          created_at?: string
          job_id?: string
          status?: string
        }
        Update: {
          application_id?: string
          cleaner_id?: string
          created_at?: string
          job_id?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "applications_cleaner_id_fkey"
            columns: ["cleaner_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "applications_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "cleaning_jobs"
            referencedColumns: ["job_id"]
          },
        ]
      }
      cleaner_profiles: {
        Row: {
          cleaning_count: number | null
          cleaning_tools_required: boolean
          created_at: string
          desired_pay: number | null
          id: number
          introduction: string
          location: string
          preffered_time_slots: Json
          profile_type: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          cleaning_count?: number | null
          cleaning_tools_required?: boolean
          created_at?: string
          desired_pay?: number | null
          id?: number
          introduction: string
          location: string
          preffered_time_slots: Json
          profile_type?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Update: {
          cleaning_count?: number | null
          cleaning_tools_required?: boolean
          created_at?: string
          desired_pay?: number | null
          id?: number
          introduction?: string
          location?: string
          preffered_time_slots?: Json
          profile_type?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "cleaner_profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      cleaning_guides: {
        Row: {
          created_at: string
          id: number
          property_id: string
          text_content: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          property_id?: string
          text_content?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          property_id?: string
          text_content?: string | null
        }
        Relationships: []
      }
      cleaning_jobs: {
        Row: {
          address: string
          cleaner_id: string | null
          created_at: string
          description: string | null
          from_dt: string
          host_id: string
          job_id: string
          latitude: number
          longitude: number
          price: number
          property_id: string
          status: string
          title: string
          to_dt: string
          urgency: string
        }
        Insert: {
          address: string
          cleaner_id?: string | null
          created_at?: string
          description?: string | null
          from_dt: string
          host_id?: string
          job_id?: string
          latitude: number
          longitude: number
          price: number
          property_id?: string
          status: string
          title: string
          to_dt: string
          urgency?: string
        }
        Update: {
          address?: string
          cleaner_id?: string | null
          created_at?: string
          description?: string | null
          from_dt?: string
          host_id?: string
          job_id?: string
          latitude?: number
          longitude?: number
          price?: number
          property_id?: string
          status?: string
          title?: string
          to_dt?: string
          urgency?: string
        }
        Relationships: [
          {
            foreignKeyName: "cleaning_jobs_cleaner_id_fkey"
            columns: ["cleaner_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cleaning_jobs_host_id_fkey"
            columns: ["host_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cleaning_jobs_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["property_id"]
          },
        ]
      }
      cleaning_price_rules: {
        Row: {
          created_at: string
          price: number | null
          property_id: string | null
          rule_id: number
          urgency: string | null
        }
        Insert: {
          created_at?: string
          price?: number | null
          property_id?: string | null
          rule_id?: number
          urgency?: string | null
        }
        Update: {
          created_at?: string
          price?: number | null
          property_id?: string | null
          rule_id?: number
          urgency?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cleaning_price_rules_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["property_id"]
          },
        ]
      }
      conversation_participants: {
        Row: {
          conversation_id: number | null
          created_at: string | null
          id: number
          user_id: string | null
        }
        Insert: {
          conversation_id?: number | null
          created_at?: string | null
          id?: number
          user_id?: string | null
        }
        Update: {
          conversation_id?: number | null
          created_at?: string | null
          id?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "conversation_participants_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversation_participants_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      conversations: {
        Row: {
          cleaning_job_id: string | null
          created_at: string | null
          id: number
          updated_at: string | null
        }
        Insert: {
          cleaning_job_id?: string | null
          created_at?: string | null
          id?: number
          updated_at?: string | null
        }
        Update: {
          cleaning_job_id?: string | null
          created_at?: string | null
          id?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "conversations_cleaning_job_id_fkey"
            columns: ["cleaning_job_id"]
            isOneToOne: false
            referencedRelation: "cleaning_jobs"
            referencedColumns: ["job_id"]
          },
        ]
      }
      guide_photos: {
        Row: {
          caption: string | null
          created_at: string
          guide_id: number
          id: number
          order_index: number
          photo_url: string
        }
        Insert: {
          caption?: string | null
          created_at?: string
          guide_id: number
          id?: number
          order_index: number
          photo_url: string
        }
        Update: {
          caption?: string | null
          created_at?: string
          guide_id?: number
          id?: number
          order_index?: number
          photo_url?: string
        }
        Relationships: [
          {
            foreignKeyName: "guide_photos_guide_id_fkey"
            columns: ["guide_id"]
            isOneToOne: false
            referencedRelation: "cleaning_guides"
            referencedColumns: ["id"]
          },
        ]
      }
      job_status: {
        Row: {
          cleaner_id: string
          created_at: string
          id: string
          job_id: string
          status: string | null
        }
        Insert: {
          cleaner_id?: string
          created_at?: string
          id?: string
          job_id?: string
          status?: string | null
        }
        Update: {
          cleaner_id?: string
          created_at?: string
          id?: string
          job_id?: string
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "job_status_cleaner_id_fkey"
            columns: ["cleaner_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "job_status_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "cleaning_jobs"
            referencedColumns: ["job_id"]
          },
        ]
      }
      messages: {
        Row: {
          content: string | null
          conversation_id: number | null
          created_at: string | null
          id: number
          image_url: string | null
          sender_id: string | null
          status: string | null
        }
        Insert: {
          content?: string | null
          conversation_id?: number | null
          created_at?: string | null
          id?: number
          image_url?: string | null
          sender_id?: string | null
          status?: string | null
        }
        Update: {
          content?: string | null
          conversation_id?: number | null
          created_at?: string | null
          id?: number
          image_url?: string | null
          sender_id?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      properties: {
        Row: {
          address: string
          area_pyeong: number
          area_sqm: number
          bed_count: number
          created_at: string
          guide_id: string
          has_cleaning_tools: boolean
          has_parking: boolean
          hope_cleaning_price: number | null
          host_id: string
          latitude: number
          longitude: number
          name: string
          property_id: string
          property_type: string
          room_count: number
        }
        Insert: {
          address: string
          area_pyeong: number
          area_sqm: number
          bed_count: number
          created_at?: string
          guide_id?: string
          has_cleaning_tools: boolean
          has_parking: boolean
          hope_cleaning_price?: number | null
          host_id?: string
          latitude: number
          longitude: number
          name: string
          property_id?: string
          property_type: string
          room_count: number
        }
        Update: {
          address?: string
          area_pyeong?: number
          area_sqm?: number
          bed_count?: number
          created_at?: string
          guide_id?: string
          has_cleaning_tools?: boolean
          has_parking?: boolean
          hope_cleaning_price?: number | null
          host_id?: string
          latitude?: number
          longitude?: number
          name?: string
          property_id?: string
          property_type?: string
          room_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "properties_host_id_fkey"
            columns: ["host_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      property_photos: {
        Row: {
          caption: string | null
          created_at: string
          id: number
          is_main_photo: boolean
          photo_url: string
          property_id: string
        }
        Insert: {
          caption?: string | null
          created_at?: string
          id?: number
          is_main_photo?: boolean
          photo_url?: string
          property_id?: string
        }
        Update: {
          caption?: string | null
          created_at?: string
          id?: number
          is_main_photo?: boolean
          photo_url?: string
          property_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "property_photos_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["property_id"]
          },
        ]
      }
      property_pricing: {
        Row: {
          base_price: number
          created_at: string
          date: string
          id: number
          laundry_fee: number
          property_id: string
          today_urgent_fee: number
          updated_at: string | null
          urgent_fee: number
        }
        Insert: {
          base_price: number
          created_at?: string
          date: string
          id?: number
          laundry_fee: number
          property_id?: string
          today_urgent_fee: number
          updated_at?: string | null
          urgent_fee: number
        }
        Update: {
          base_price?: number
          created_at?: string
          date?: string
          id?: number
          laundry_fee?: number
          property_id?: string
          today_urgent_fee?: number
          updated_at?: string | null
          urgent_fee?: number
        }
        Relationships: [
          {
            foreignKeyName: "property_pricing_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["property_id"]
          },
        ]
      }
      ratings: {
        Row: {
          comment: string | null
          created_at: string
          id: number
          job_id: string
          rated_id: string
          rater_id: string
          rating: number
        }
        Insert: {
          comment?: string | null
          created_at?: string
          id?: number
          job_id?: string
          rated_id?: string
          rater_id?: string
          rating: number
        }
        Update: {
          comment?: string | null
          created_at?: string
          id?: number
          job_id?: string
          rated_id?: string
          rater_id?: string
          rating?: number
        }
        Relationships: [
          {
            foreignKeyName: "ratings_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "cleaning_jobs"
            referencedColumns: ["job_id"]
          },
          {
            foreignKeyName: "ratings_rated_id_fkey"
            columns: ["rated_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ratings_rater_id_fkey"
            columns: ["rater_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string
          email: string
          id: string
          name: string
          profile_image: string | null
          role: Database["public"]["Enums"]["user_role"] | null
        }
        Insert: {
          created_at?: string
          email: string
          id: string
          name: string
          profile_image?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          name?: string
          profile_image?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
        }
        Relationships: [
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      application_status: "applied" | "accepted" | "rejected" | "canceled"
      profile_type: "individual" | "company"
      status: "scheduled" | "on_the_way" | "in_progress" | "completed"
      urgency: "today_urgent" | "urgent" | "normal"
      user_role: "host" | "cleaner"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
