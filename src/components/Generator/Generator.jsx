import React, { useEffect } from 'react'

import { getAdvices } from '../../api'
import styles from './Generator.module.scss'
import divider from '../../assets/images/pattern-divider-desktop.svg'
import divider_m from '../../assets/images/pattern-divider-mobile.svg'

import { ReactComponent as Dice } from '../../assets/images/icon-dice.svg'

export default function Generator() {
  const [advices, setAdvices] = React.useState([])
  const [error, setError] = React.useState(null)
  const [loading, setLoading] = React.useState(false)

  async function loadAdvices() {
    setLoading(true)
    try {
      const data = await getAdvices()
      setAdvices(data)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadAdvices()
  }, [])

  if (loading) {
    return <h1>Loading...</h1>
  }

  if (error) {
    return <h1>There was an error: {error.message}</h1>
  }

  return (
    <main>
      <section className={styles.card}>
        <h2>ADVICE #{advices.id}</h2>
        <h1>“{advices.advice}”</h1>

        <picture>
          <source media="(min-width: 500px)" srcSet={divider} />
          <img src={divider_m} alt="bar" />
        </picture>
      </section>
      <button onClick={loadAdvices} id="al" aria-label="Dice" title="Dice">
        <Dice />
      </button>
    </main>
  )
}
