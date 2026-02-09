'use client';

export function NewYearBanner() {
  return (
    <>
      <style jsx>{`
        .banner {
          width: 100%;
          max-width: 1400px;
          margin: auto;
          background: linear-gradient(135deg, #ff0000, #d60000);
          border-radius: 12px;
          padding: 30px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          overflow: hidden;
          position: relative;
          color: #fff;
        }

        .left {
          width: 65%;
        }

        .sale-time {
          font-size: 14px;
          opacity: 0.9;
          margin-bottom: 10px;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% {
            opacity: 0.6;
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0.6;
          }
        }

        .title {
          font-size: 48px;
          font-weight: 800;
          margin-bottom: 25px;
          display: flex;
          align-items: center;
          gap: 12px;
          animation: slideIn 1.2s ease forwards;
        }

        @keyframes slideIn {
          from {
            transform: translateX(-50px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
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
        }

        .offers {
          display: flex;
          gap: 15px;
        }

        .card {
          background: #fff;
          color: #000;
          border-radius: 10px;
          padding: 16px;
          width: 180px;
          text-align: center;
          transition: 0.3s ease;
          animation: float 4s ease-in-out infinite;
        }

        .card:nth-child(2) {
          animation-delay: 1s;
        }
        .card:nth-child(3) {
          animation-delay: 2s;
        }

        @keyframes float {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-6px);
          }
          100% {
            transform: translateY(0);
          }
        }

        .card:hover {
          transform: scale(1.05);
        }

        .price {
          font-weight: 700;
          color: #ff0000;
        }

        .code {
          margin-top: 8px;
          font-size: 13px;
          color: #444;
        }

        .right {
          width: 30%;
          position: relative;
        }

        .promo {
          background: radial-gradient(circle, #fff 40%, transparent 70%);
          width: 280px;
          height: 280px;
          border-radius: 50%;
          display: grid;
          place-items: center;
          animation: glow 3s infinite;
        }

        @keyframes glow {
          0% {
            box-shadow: 0 0 20px #fff;
          }
          50% {
            box-shadow: 0 0 40px #fff;
          }
          100% {
            box-shadow: 0 0 20px #fff;
          }
        }

        .promo-box {
          background: #ff0000;
          color: #fff;
          padding: 25px;
          text-align: center;
          border-radius: 12px;
          transform: rotate(-5deg);
        }

        .promo-box h2 {
          font-size: 36px;
          line-height: 1.1;
        }

        .promo-box span {
          font-size: 14px;
          letter-spacing: 1px;
        }

        @media (max-width: 900px) {
          .banner {
            flex-direction: column;
            gap: 30px;
          }
          .left,
          .right {
            width: 100%;
            text-align: center;
          }
          .offers {
            justify-content: center;
            flex-wrap: wrap;
          }
        }
      `}</style>
      <div className="banner">
        <div className="left">
          <div className="sale-time">Sale Ends: Jan 8, 13:29 (GMT +5.5)</div>

          <div className="title">
            NEW YEAR DEALS
            <div className="arrow">›</div>
          </div>

          <div className="offers">
            <div className="card">
              <div className="price">৳ 5,599.39 OFF</div>
              <small>Orders ৳49,367.97+</small>
              <div className="code">Code: 01CD60</div>
            </div>

            <div className="card">
              <div className="price">৳ 2,333.08 OFF</div>
              <small>Orders ৳19,504.55+</small>
              <div className="code">Code: 01CD25</div>
            </div>

            <div className="card">
              <div className="price">৳ 1,866.46 OFF</div>
              <small>Orders ৳14,838.39+</small>
              <div className="code">Code: 01CD20</div>
            </div>
          </div>
        </div>

        <div className="right">
          <div className="promo">
            <div className="promo-box">
              <h2>1st</h2>
              <h2>EVERY</h2>
              <h2>MONTH</h2>
              <span>Top Deal</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
