import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import { useState, useEffect } from 'react'
import Oreha from '../orehaCrafting.json'

const inter = Inter({ subsets: ['latin'] })

type ItemPrices = {
  fish: number,
  pearl: number,
  goldFish: number,
  blueOreha: number,
  greenOreha: number,
  purpleOreha: number,
  greenPotion: number,
  bluePotion: number,
  purplePotion: number
}

export default function Home() {

  const [discount, setDiscount] = useState(
    {
      special: 12,
      battle: 0,
      time: 16
    }
  )

  const [price, setPrice] = useState<ItemPrices>({
      //Fish
      goldFish:     13,
      pearl:        3,
      fish:         24,

      //Oreha
      blueOreha:    11,
      greenOreha:   9,
      purpleOreha:  17,

      //Potions
      greenPotion:  10,
      bluePotion:   15,
      purplePotion: 20
  })

  const changeDiscount = (type: string, discount: number) => {
    setDiscount((prevState) => ({ ...prevState, [type]: discount })) 
  }
 
  const changePrice = (item: string, price: number) => {
    setPrice((prevState) => ({ ...prevState, [item]: price })) 
  }
 
  const calculateFishPrice = (item: string) => {
    let goldFishCost  = (price.goldFish / 10)   * Oreha[item].fish.goldFish;
    let pearlCost     = (price.pearl / 10)      * Oreha[item].fish.pearl;
    let fishCost      = (price.fish / 100)      * Oreha[item].fish.fish;
    let craftingCost  = Math.floor(Oreha[item].fish.costToCraft * (1 - (discount.special / 100)));
    let totalCost     = fishCost + pearlCost + goldFishCost + craftingCost;

    let timeToCraft   = Math.floor(Oreha[item].fish.timeToCraft * (1 - (discount.time / 100)));
    let auctionPrice  = Math.floor(price[item] * 0.95) * Oreha[item].fish.qtyCrafted; //Add 1 for each additional Great Success
    let profit        = auctionPrice - totalCost;
    let ThreeLines    = Math.round(profit * 30);

    return (
      <>
        <table>
          <tbody>
            <tr>
              <td colSpan={2}> {item} </td>
            </tr>
            <tr>
              <td>Profit per craft:</td>
              <td>{profit.toFixed(1)}g</td>
            </tr>  
            <tr>
              <td>Profit per {Oreha[item].fish.qtyCrafted}x craft:</td>
              <td>{ThreeLines}g</td>
            </tr>  
            <tr>
              <td>Got "Great Success"?</td>
              <td>{auctionPrice}g per hit</td>
            </tr>
            <tr>
              <td>Time to finish 30x:</td>
              <td>{(((timeToCraft * 10)/60) / 60).toFixed(0)}hr {(((timeToCraft * 10) / 60) % 60).toFixed(0)}m</td>
            </tr>
          </tbody>
        </table>
      </>
    );
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.itemPrices}>
          <table cellSpacing={10}>
            <tbody>
              <tr>
                <td colSpan={2}> Discount </td>
              </tr>
              <tr>
                <td>Special Discount</td>
                <td><input type="number" value={discount.special} onChange={(e) => changeDiscount('special', parseInt(e.target.value))} /></td>
              </tr>
              <tr><td colSpan={2}></td></tr>
              <tr><td colSpan={2}></td></tr>
              <tr>
                <td colSpan={2}> Fishes </td>
              </tr>
              <tr>
                <td>Fish</td>
                <td><input type="number" value={price.fish} onChange={(e) => changePrice('fish', parseInt(e.target.value))} /></td>
              </tr>
              <tr>
                <td>Pearl</td>
                <td><input type="number" value={price.pearl} onChange={(e) => changePrice('pearl', parseInt(e.target.value))} /></td>
              </tr>
              <tr>
                <td>Gold Fish</td>
                <td><input type="number" value={price.goldFish} onChange={(e) => changePrice('goldFish', parseInt(e.target.value))} /></td>
              </tr>
              <tr><td colSpan={2}></td></tr>
              <tr><td colSpan={2}></td></tr>
              <tr>
                <td colSpan={2}> Orehas </td>
              </tr>
              <tr>
                <td>Simple Oreha (Green)</td>
                <td><input type="number" value={price.greenOreha} onChange={(e) => changePrice('greenOreha', parseInt(e.target.value))} /></td>
              </tr>
              <tr>
                <td>Basic Oreha (Blue)</td>
                <td><input type="number" value={price.blueOreha} onChange={(e) => changePrice('blueOreha', parseInt(e.target.value))} /></td>
              </tr>
              <tr>
                <td>Superior Oreha (Purple)</td>
                <td><input type="number" value={price.purpleOreha} onChange={(e) => changePrice('purpleOreha', parseInt(e.target.value))} /></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className={styles.grid}>
          {calculateFishPrice('greenOreha')}
          {calculateFishPrice('blueOreha')}
          {calculateFishPrice('purpleOreha')}
        </div>
      </main>
    </>
  )
}
