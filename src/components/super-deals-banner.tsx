'use client';

import { CheckCircle } from "lucide-react";
import useEmblaCarousel from 'embla-carousel-react';
import { useState } from "react";

const couponCodes = [
    {
        code: "01CD60",
        discount: "৳7,839.15 OFF",
        condition: "orders ৳69,115.16+",
    },
    {
        code: "01CD25",
        discount: "৳3,266.31 OFF",
        condition: "orders ৳27,306.37+",
    },
    {
        code: "01CD20",
        discount: "৳2,613.04 OFF",
        condition: "orders ৳20,773.75+",
    },
    {
        code: "01CD80",
        discount: "৳12,039.15 OFF",
        condition: "orders ৳97,115.16+",
    },
    {
        code: "01CD45",
        discount: "৳6,066.31 OFF",
        condition: "orders ৳55,306.37+",
    },
    {
        code: "01CD30",
        discount: "৳4,013.04 OFF",
        condition: "orders ৳34,773.75+",
    },
];

export function SuperDealsBanner() {
    const [emblaRef] = useEmblaCarousel({ loop: true, slidesToScroll: 'auto' });
    const [showPopup, setShowPopup] = useState(false);

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text).then(() => {
            setShowPopup(true);
            setTimeout(() => setShowPopup(false), 2000);
        });
    };

    return (
        <>
            <style jsx>{`
              .banner-container {
                background: linear-gradient(135deg, #ff0000, #d60000);
                padding: 2rem 1rem;
                position: relative;
                color: #fff;
              }
              .banner {
                max-width: 1400px;
                margin: auto;
                display: flex;
                justify-content: space-between;
                align-items: center;
                gap: 20px;
              }
              .left {
                width: 70%;
              }
              .right {
                width: 30%;
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;
              }
              .right img {
                max-width: 100%;
                height: auto;
              }
              .sale-time {
                font-size: 14px;
                opacity: 0.9;
                margin-bottom: 10px;
              }
              .title {
                font-size: 48px;
                font-weight: 800;
                margin-bottom: 25px;
                display: flex;
                align-items: center;
                gap: 12px;
              }
              .arrow {
                background: #fff;
                color: #ff0000;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                display: grid;
                place-items: center;
                font-size: 22px;
                font-weight: bold;
              }
              .embla {
                overflow: hidden;
              }
              .embla__container {
                display: flex;
                gap: 15px;
              }
              .embla__slide {
                  flex: 0 0 220px;
                  min-width: 0;
              }
              .card {
                background: #fff;
                color: #d60000;
                padding: 1rem;
                border-radius: 8px;
                text-align: center;
                cursor: pointer;
                width: 100%;
                height: 130px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                gap: 0.5rem;
              }
              .card .price {
                font-size: 1.25rem;
                font-weight: bold;
              }
              .card small {
                font-size: 0.8rem;
                display: block;
              }
              .card .code {
                margin-top: 0;
                font-weight: bold;
              }
              .popup {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(0,0,0,0.8);
                color: white;
                padding: 2rem;
                border-radius: 1rem;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 1rem;
                z-index: 10;
              }

              @media (max-width: 900px) {
                .banner {
                  flex-direction: column;
                  gap: 30px;
                }
                .left, .right {
                  width: 100%;
                  text-align: center;
                }
                .embla__container {
                  justify-content: center;
                }
                .title {
                    justify-content: center;
                }
              }
            `}</style>
            <div className="banner-container">
              {showPopup && (
                  <div className="popup">
                      <CheckCircle className="w-12 h-12 text-green-500" />
                      <p className="font-bold">Copied successfully</p>
                      <p>Paste this code at checkout</p>
                  </div>
              )}
              <div className="banner">
                <div className="left">
                  <div className="sale-time">Sale Ends: Jan 8, 13:29 (GMT+5.5)</div>
                  <div className="title">
                    NEW YEAR DEALS
                    <div className="arrow">›</div>
                  </div>
                  <div className="embla" ref={emblaRef}>
                    <div className="embla__container">
                      {couponCodes.map((coupon, index) => (
                        <div className="embla__slide" key={index}>
                            <div className="card" onClick={() => copyToClipboard(coupon.code)}>
                              <div className="price">{coupon.discount}</div>
                              <small>{coupon.condition}</small>
                              <div className="code">Code: {coupon.code}</div>
                            </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="right">
                    <img src="/images/Promotion image.png" alt="Promotional image" />
                </div>
              </div>
            </div>
        </>
    );
}
