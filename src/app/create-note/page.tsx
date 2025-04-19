import Link from "next/link"
const CreateNote = () => {
  return (
    <div>
        <form action="">
            <label htmlFor="title">Title</label>
            <input type="text" name="title" id="title" placeholder='Title' />

            <label htmlFor="description">Description</label>
            <textarea rows={5} name='description' id='description' placeholder='Note Content' />
            <div>
            <button type='submit'>Save</button>
            <Link href={'/'}>Cancel</Link>

            </div>
        </form>
    </div>
  )
}

export default CreateNote