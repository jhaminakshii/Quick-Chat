
// Middleware to protect routes

export const protectRoute = async (req, res, next) => {
    try {
        
    } catch (error) {
        console.log(error.message)
        res.json({
          success: false,
          message:error.message
        });
    }
}