import ShadowButtonLabel from './ShadowButtonLabel'
import styles from './DeleteMatch.module.scss';
import { useRouter } from 'next/router'
import { useState } from 'react'

const DeleteMatch = ({ seasonId, matchId }) => {
    const router = useRouter()
    const [isDeleting, setIsDeleting] = useState(false)

    const deleteMatch = async () => {
        setIsDeleting(true)
        const response = await fetch(`/api/match?matchId=${matchId}`, {
            method: 'DELETE'
        })
        if (response.ok) {
            router.push(`/season/${seasonId}`)
        } else {
            console.error(`Error deleting match with ID ${matchId}: ${response.statusText}`)
        }
        setIsDeleting(false)
    }

    return (
        <div className={styles.DeleteMatch}>
            <ShadowButtonLabel onClick={deleteMatch} disabled={isDeleting}
                label={isDeleting ? 'Deleting...' : 'Delete Match'}
            />
        </div>
    )
}

export default DeleteMatch;