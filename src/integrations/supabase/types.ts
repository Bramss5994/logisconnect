export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      bailleurs: {
        Row: {
          created_at: string
          id: string
          logo_url: string | null
          nom: string
          slug: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          logo_url?: string | null
          nom: string
          slug: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          logo_url?: string | null
          nom?: string
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      demande_updates: {
        Row: {
          created_at: string
          demande_id: string
          id: string
          media_url: string | null
          message: string | null
        }
        Insert: {
          created_at?: string
          demande_id: string
          id?: string
          media_url?: string | null
          message?: string | null
        }
        Update: {
          created_at?: string
          demande_id?: string
          id?: string
          media_url?: string | null
          message?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "demande_updates_demande_id_fkey"
            columns: ["demande_id"]
            isOneToOne: false
            referencedRelation: "demandes"
            referencedColumns: ["id"]
          },
        ]
      }
      demandes: {
        Row: {
          adresse: string
          bailleur_id: string | null
          categorie_ia: string | null
          created_at: string
          description: string
          email: string | null
          historique: Json[] | null
          id: string
          logement: string
          media_urls: string[] | null
          nom: string
          prenom: string
          statut: Database["public"]["Enums"]["request_status"]
          suggestions_ia: string[] | null
          telephone: string
          tracking_id: string
          type_probleme: Database["public"]["Enums"]["problem_type"]
          updated_at: string
          urgence: Database["public"]["Enums"]["urgency_level"] | null
        }
        Insert: {
          adresse: string
          bailleur_id?: string | null
          categorie_ia?: string | null
          created_at?: string
          description: string
          email?: string | null
          historique?: Json[] | null
          id?: string
          logement: string
          media_urls?: string[] | null
          nom: string
          prenom: string
          statut?: Database["public"]["Enums"]["request_status"]
          suggestions_ia?: string[] | null
          telephone: string
          tracking_id?: string
          type_probleme: Database["public"]["Enums"]["problem_type"]
          updated_at?: string
          urgence?: Database["public"]["Enums"]["urgency_level"] | null
        }
        Update: {
          adresse?: string
          bailleur_id?: string | null
          categorie_ia?: string | null
          created_at?: string
          description?: string
          email?: string | null
          historique?: Json[] | null
          id?: string
          logement?: string
          media_urls?: string[] | null
          nom?: string
          prenom?: string
          statut?: Database["public"]["Enums"]["request_status"]
          suggestions_ia?: string[] | null
          telephone?: string
          tracking_id?: string
          type_probleme?: Database["public"]["Enums"]["problem_type"]
          updated_at?: string
          urgence?: Database["public"]["Enums"]["urgency_level"] | null
        }
        Relationships: [
          {
            foreignKeyName: "demandes_bailleur_id_fkey"
            columns: ["bailleur_id"]
            isOneToOne: false
            referencedRelation: "bailleurs"
            referencedColumns: ["id"]
          },
        ]
      }
      user_bailleurs: {
        Row: {
          bailleur_id: string
          created_at: string
          id: string
          user_id: string
        }
        Insert: {
          bailleur_id: string
          created_at?: string
          id?: string
          user_id: string
        }
        Update: {
          bailleur_id?: string
          created_at?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_bailleurs_bailleur_id_fkey"
            columns: ["bailleur_id"]
            isOneToOne: false
            referencedRelation: "bailleurs"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_bailleur_ids: { Args: { p_user_id: string }; Returns: string[] }
      user_belongs_to_bailleur: {
        Args: { p_bailleur_id: string; p_user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      problem_type:
        | "plomberie"
        | "electricite"
        | "chauffage"
        | "nuisibles"
        | "administratif"
        | "autre"
      request_status: "new" | "qualified" | "assigned" | "in_progress" | "done"
      urgency_level: "low" | "medium" | "high" | "critical"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      problem_type: [
        "plomberie",
        "electricite",
        "chauffage",
        "nuisibles",
        "administratif",
        "autre",
      ],
      request_status: ["new", "qualified", "assigned", "in_progress", "done"],
      urgency_level: ["low", "medium", "high", "critical"],
    },
  },
} as const
