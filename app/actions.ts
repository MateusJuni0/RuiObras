"use server";

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function submitLead(formData: {
  fullName: string;
  phone: string;
  email: string;
  projectDetails: string;
}) {
  try {
    const { error } = await supabase
      .from("leads_ruiobras")
      .insert([
        {
          full_name: formData.fullName,
          phone: formData.phone,
          email: formData.email,
          project_details: formData.projectDetails,
        },
      ]);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error("Error submitting lead:", error);
    return { success: false, error: "Falha ao enviar o pedido." };
  }
}
