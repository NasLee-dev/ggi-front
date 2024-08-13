import styles from './styles/listStyles.module.css'

export default function List() {
  return (
    <div className={styles.listContainer}>
      <div className={styles.downloadContainer}>
        <div>
          갯수 select
        </div>
        <div>
          <span>다운로드</span>
          <span>전체 다운로드</span>
        </div>
      </div>

      {/* 검색 리스트 */}
      <div className={styles.tableContainer}>
        list table
      </div>
      <div>
        pagination
      </div>
    </div>
  )
}