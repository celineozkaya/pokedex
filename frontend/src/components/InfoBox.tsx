import type { JSX } from "react";
import styles from "../styles/InfoBox.module.css"

interface InfoBoxProps {
    readonly title : string;
    readonly data? : string | number;
    readonly color : string;
}

export default function InfoBox({title, data, color} : InfoBoxProps) : JSX.Element {
    return (
        <div className={styles.box} style={{backgroundColor : color}}>
            <div className={styles.title}>
                {title}
            </div>
            <div className={styles.data}>
                {data}
            </div>
        </div>
    );
}