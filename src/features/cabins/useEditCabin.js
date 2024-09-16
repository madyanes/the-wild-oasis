import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { createEditCabin } from '../../services/apiCabins'

export function useEditCabin() {
  const queryClient = useQueryClient()

  const { mutate: editCabin, isPending: isEditing } = useMutation({
    mutationFn: ({ newCabin, id }) => createEditCabin(newCabin, id),
    onSuccess: () => {
      toast.success('Cabin successfully updated')
      queryClient.invalidateQueries({ queryKey: ['cabins'] })
    },
    onError: (err) => {
      toast.error(err.message)
    },
  })

  return { isEditing, editCabin }
}
