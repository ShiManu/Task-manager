const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing SUPABASE_URL or SUPABASE_ANON_KEY environment variables");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function getAllTasks() {
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .order("createdAt", { ascending: false });

  if (error) throw error;
  return data;
}

async function insertTask(task) {
  const { data, error } = await supabase
    .from("tasks")
    .insert([task])
    .select();

  if (error) throw error;
  return data[0];
}

async function updateTaskById(id, changes) {
  const { data, error } = await supabase
    .from("tasks")
    .update(changes)
    .eq("id", id)
    .select();

  if (error) throw error;
  return data[0];
}

async function deleteTaskById(id) {
  const { error } = await supabase
    .from("tasks")
    .delete()
    .eq("id", id);

  if (error) throw error;
}

module.exports = { getAllTasks, insertTask, updateTaskById, deleteTaskById };
