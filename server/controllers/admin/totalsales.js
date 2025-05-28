import Order from "../../models/order.js";

const TotalSales = async (req, res) => {
  try {
    const totalSales = await Order.aggregate([
      {
        $match: { status: "Completed" } 
      },
      {
        $group: {
          _id: null,
          totalSales: { $sum: "$totalPrice" }
        }
      }
    ]);

    res.status(200).json({ totalSales: totalSales[0]?.totalSales || 0 });
  } catch (error) {
    console.error('Error calculating total sales:', error);
    res.status(500).json({ message: 'Error calculating total sales', error });
  }
};


export default TotalSales;