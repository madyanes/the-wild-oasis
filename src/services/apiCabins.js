import supabase, { supabaseUrl } from './supabase'

export async function getCabins() {
  const { data: cabins, error } = await supabase.from('cabins').select('*')

  if (error) {
    console.error(error)
    throw new Error('Cabins could not be loaded')
  }

  return cabins
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl)
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    '/',
    ''
  )
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`

  // Create / Edit cabin
  let query = supabase.from('cabins')

  // Create
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }])

  // Edit
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq('id', id)

  const { data: cabin, error } = await query.select().single()

  if (error) {
    console.error(error)
    throw new Error('Cabins could not be created')
  }

  // Upload image
  const { error: storageError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, newCabin.image)

  // Delete the cabin IF there was an error uploading image
  if (storageError) {
    await supabase.from('cabins').delete().eq('id', cabin.id)
    console.error(storageError)
    throw new Error(
      'Cabin image could not be uploaded and the cabin was not created'
    )
  }

  return cabin
}

export async function deleteCabin(id) {
  const { error } = await supabase.from('cabins').delete().eq('id', id)

  if (error) {
    console.error(error)
    throw new Error('Cabins could not be deleted')
  }
}
