using User.Models;
namespace User.Data
{
    public interface IUserRepo
    {
        bool SaveChanges();
        UserModel GetUserByUsernameAndPassword(string username, string pwd);
        void CreateUser(UserModel usr);
        public UserModel doesUsernameExist(string usr);
    }
}