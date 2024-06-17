export default function checkAdmin(req, res, next) {
  if (!req.session.admin) {
    res.redirect('/auth/login');
  }
  next();
}
