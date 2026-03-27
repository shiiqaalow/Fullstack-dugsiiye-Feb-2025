import { supabase } from "./supabase";

export const signUp = async (email, password, username = "") => {
  console.log("🚀 Starting signup process...");
  console.log("📧 Email:", email);

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { username },
    },
  });

  if (error) {
    console.error("❌ Signup error:", error.message);
    throw error;
  }

  console.log("✅ Signup response:", data);

  // Check email confirmation
  const { data: sessionData } = await supabase.auth.getSession();

  if (!sessionData.session) {
    console.log("📩 Email confirmation required. Check inbox.");
    return data;
  }

  const displayName = username || email.split("@")[0];
  console.log("👤 Display name:", displayName);

  // Create profile in users table
  const { data: profile, error: profileError } = await supabase
    .from("users")
    .insert({
      id: data.user.id,
      username: displayName,
      avatar_url: null,
    })
    .select()
    .single();

  if (profileError) {
    console.error("❌ Profile creation failed:", profileError);
  } else {
    console.log("🎉 Profile created successfully:", profile);
  }

  return data;
};


export const getUserProfile = async (userId) => {
  console.log("🔍 Fetching profile for user:", userId);

  const { data: sessionData } = await supabase.auth.getSession();

  if (!sessionData.session) {
    console.warn("⚠️ No active session");
    return null;
  }

  const { data: profile, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();

  // Profile NOT found → create it
  if (error && error.code === "PGRST116") {
    console.warn("⚠️ No profile found. Creating new profile...");

    const { data: userData } = await supabase.auth.getUser();
    console.log("👤 User auth data:", userData);

    const email = userData?.user?.email;
    const defaultUsername = email
      ? email.split("@")[0]
      : `user_${Date.now()}`;

    const { data: newProfile, error: profileError } = await supabase
      .from("users")
      .insert({
        id: userId,
        username: defaultUsername,
        avatar_url: null,
      })
      .select()
      .single();

    if (profileError) {
      console.error("❌ New profile creation failed:", profileError);
      throw profileError;
    }

    console.log("✅ New profile created:", newProfile);
    return newProfile;
  }

  // Other errors
  if (error) {
    console.error("❌ Error fetching profile:", error);
    throw error;
  }

  console.log("✅ Profile found:", profile);
  return profile;
};


export const signIn = async (email, password) => {
  console.log("🔐 Signing in user:", email);

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("❌ Login error:", error.message);
    throw error;
  }

  console.log("✅ Login success:", data.user);

  if (data?.user) {
    try {
      const profile = await getUserProfile(data.user.id);
      console.log("👤 User profile:", profile);
    } catch (profileError) {
      console.error("❌ Profile fetch error:", profileError);
    }
  }

  return data;
};


export const onAuthChange = (callback) => {
  const { data } = supabase.auth.onAuthStateChange((event, session) => {
    console.log("🔄 Auth event:", event);
    console.log("👤 Session user:", session?.user);

    callback(session?.user || null, event);
  });

  return () => data.subscription.unsubscribe();
};

// export const  onAuthChange = (callback) => {

//     const { data } = supabase.auth.onAuthStateChange((event, session) => {
//             callback(session?.user || null, event)
//     })

//     return () => data.subscription.unsubscribe();
// }


/* Sign out the current user */
export const signOut = async () => {
  console.log("👋 Signing out user...");
  await supabase.auth.signOut();
  console.log("✅ User signed out");
};

  