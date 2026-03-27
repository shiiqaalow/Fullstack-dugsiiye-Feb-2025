import { supabase } from "./supabase";
import { Records } from "../Pages/Records";
import toast from "react-hot-toast";

export const createRecord = async (record) => {

  const articleData = {
    out: record.out,
    card: record.card,
    cash: record.cash,
    electricity: record.electricity,
    total: record.total,
    author_id: record.author_id,   // ⭐ FIXED
    published: record.published ?? false
  };

  const { data, error } = await supabase
    .from("records")
    .insert(articleData)
    .select()
    .single();

  if (error) {
    console.error("Error creating records:", error);
    throw error;
  }

  return data;
};

// all records 100

// offset 0 -> 10 -> 20

// limit 10

// export const getArticleByAuthor = async ( authorId, { includeUnPublished = false, limit = 10, offset = 0 } ) => {
//     let query = supabase
//         .from('records')
//         .select(`
//             *,
//             comments: comments(count)
//         `)
//         .eq('author_id',authorId)
//         .order('created_at',{ ascending: false })
//         .range
// }

export const getRecordByAuthor = async (
  authorId,
  { includeUnPublished = false, limit = 10, offset = 0 },
) => {
  let query = supabase
    .from("records")
    .select(` * ,
        comments:comments(count)`,
    )
    .eq("author_id", authorId)
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (!includeUnPublished) {
    query = query.eq("published", true);
  }

  const { data, error, count } = await query;

  if (error) throw error;

  return {
    records: data,
    count,
  };
};

export const deleteRecord = async (id) => {
  console.log(`Attempting to delete record with ID: ${id}`);

  // First delete all associated comments

  const { error: commentsError } = await supabase
    .from("comments")
    .delete()
    .eq("record_id", id);

  if (commentsError) {
    console.error("Error deleting comments:", commentsError);
    console.error(
      "Comments error details:",
      JSON.stringify(commentsError, null, 2),
    );
  } else {
    toast.success("You have Successfully deleted  the record");
    console.log("Successfully deleted associated comments");
  }

  // Finally delete the record

  const { data, error } = await supabase
    .from("records")
    .delete()
    .eq("id", id)
    .select();

  if (error) {
    console.error("Error deleting record:", error);
    console.error("Record error details:", JSON.stringify(error, null, 2));
    throw error;
  } else {
    toast.success(`Successfully deleted record with ID: ${id}`);
    console.log(`Successfully deleted record with ID: ${id}`);
  }

  return data;
};

// export const getRecordByAuthor = async (id) => {
//   /*
//     record -> comments -> users = id, name, 
//     */

//   const { data, error } = await supabase
//     .from("records")
//     .select(` * ,
//            comments(id,content, created_at,
//                user:user_id(id, username, avatar_url)
//             ),
//             author:author_id(id, username, avatar_url)    
//             `
//     )
//     .eq("id", id)
//     .single();

//   if (error) throw error;
//   return data;
// };



// export const updateArticle = async (id, updates) => {
//   console.log(`Attempting to update article with ID: ${id}`, updates);

//   const { data, error } = await supabase
//     .from("articles")
//     .update({
//       title: updates.title,
//       content: updates.content,
//       tags: updates.tags,
//       published: updates.published,
//       featured_image: updates.featuredImageUrl,
//       updated_at: new Date(),
//     })
//     .eq("id", id)
//     .select()
//     .single();

//   if (error) {
//     console.error("Error updating article:", error);
//     console.error("Update error details:", JSON.stringify(error, null, 2));
//     throw error;
//   }

//   console.log("Article updated successfully:", data);
//   return data;
// };
