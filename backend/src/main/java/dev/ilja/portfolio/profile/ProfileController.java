package dev.ilja.portfolio.profile;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {
  private final ProfileRepository profiles;

  public ProfileController(ProfileRepository profiles) {
    this.profiles = profiles;
  }

  @GetMapping
  public ProfileDto get() {
    return profiles.getProfile();
  }
}
