import styles from './booking.module.css'
import BookingMenu from '@/components/RentalMenu'

export default function RentalLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className={styles.sectionlayout}>
            {/* <BookingMenu /> */}
            {children}
        </div>
    )
} 